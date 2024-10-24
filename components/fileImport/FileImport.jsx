import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';
import { Button } from "@nextui-org/button";
import CVSMoveJSONToDBJSON from "../../app/utils/CVSMoveJSONToDBJSON"
import { CreateMoves } from '/app/api/moves/requests'
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import './styles.css';

const FileImport = () => {
    const { data: session } = useSession({ required: true });

    const router = useRouter();
    const [jsonData, setJsonData] = useState([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();

        reader.onload = (e) => {
            const data = new Uint8Array(e.target.result);
            const workbook = XLSX.read(data, { type: 'array' });

            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];

            const csvData = XLSX.utils.sheet_to_csv(worksheet, { header: 1 });
            const rows = csvData.split('\n').slice(6).join('\n');

            Papa.parse(rows, {
                header: true,
                complete: (results) => {
                    const parsedData = CVSMoveJSONToDBJSON(results.data, session.user.name);
                    setJsonData(parsedData);
                },
            });
        };

        reader.readAsArrayBuffer(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            console.log(jsonData);

            const res = await CreateMoves(jsonData);
            console.log(res)
            if (res) {
                router.push('/pages/moves');
                router.refresh();
            } else {
                throw new Error('Failed to create the imported moves.')
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div className="flex justify-center bg-slate-100">
            <form onSubmit={handleSubmit} className="flex flex-col justify-center gap-3 w-7/12 p-5 ">

                <div className="file-input-container bg-white rounded-lg text-center">
                    <input type="file" className="file-input bg-white rounded-lg py-5 w-full" accept=".xls,.xlsx" onChange={handleFileUpload} />
                </div>

                <Button type="submit"
                    className="mt-2 
                    w-1/2.5 
                    self-center trnap-3 
                    transition-colors 
                    duration-300 
                    ease-in-out 
                    hover:bg-columbia-blue-hover 
                    bg-teal 
                    text-white 
                    font-semibold">
                    Importar movimientos
                </Button>
            </form>
        </div>
    );
};

export default FileImport;
