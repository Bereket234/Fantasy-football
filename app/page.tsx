"use client"
import { useEffect, useState } from "react";
import Header from "../components/Header";
import Dropdown from "../components/Dropdown";
import PlayerTable from "../components/PlayerTable";
import PlayerDetails from "../components/PlayerDetails";
import { Player } from "@/types/Player";
import { Slate } from "@/types/Slate";



const Page = () => {
    const [slates, setSlates] = useState<Slate[]>([]);
    const [selectedOperator, setSelectedOperator] = useState<string>("");
    const [gameTypes, setGameTypes] = useState<string[]>([]);
    const [slateNames, setSlateNames] = useState<string[]>([]);
    const [selectedSlate, setSelectedSlate] = useState<Player[]>([]);
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [operators, setOperators] = useState<string[]>([]);

     useEffect(() => {
         const fetchSlates = async () => {
             const response = await fetch("/data.json");
             const data: Slate[] = await response.json();
             setSlates(data);

             // Extract unique operators
             const uniqueOperators = [
                 ...new Set(data.map((slate) => slate.operator)),
             ];
             setOperators(uniqueOperators); // Set operators dynamically

             // Set initial values
             setSelectedOperator(uniqueOperators[0]); // Default to the first operator
             setGameTypes([
                 ...new Set(data.map((slate) => slate.operatorGameType)),
             ]);
             setSlateNames([
                 ...new Set(data.map((slate) => slate.operatorName)),
             ]);
             setSelectedSlate(data[0]?.dfsSlatePlayers || []);
             setSelectedPlayer(data[0]?.dfsSlatePlayers[0] || null);
         };

         fetchSlates();
     }, []);

    const handleOperatorChange = (operator: string) => {
        const filteredSlates = slates.filter(
            (slate) => slate.operator === operator
        );
        const uniqueGameTypes = [
            ...new Set(filteredSlates.map((slate) => slate.operatorGameType)),
        ];
        setGameTypes(uniqueGameTypes);
        setSlateNames([]);
        setSelectedOperator(operator);
    };
    const handleGameTypeChange = (gameType: string) => {
        const filteredSlates = slates.filter(
            (slate) =>
                slate.operatorGameType === gameType &&
                slate.operator === selectedOperator
        );
        const uniqueSlateNames = [
            ...new Set(filteredSlates.map((slate) => slate.operatorName)),
        ];
        setSlateNames(uniqueSlateNames);
    };

    const handleSlateNameChange = (slateName: string) => {
        const filteredSlate = slates.find(
            (slate) =>
                slate.operatorName === slateName &&
                slate.operatorGameType === gameTypes[0]
        );
        if (filteredSlate) {
            setSelectedSlate(filteredSlate.dfsSlatePlayers);
            setSelectedPlayer(filteredSlate.dfsSlatePlayers[0]);
        }
    };

    return (
        <>
            <Header />
            <div className="flex flex-col items-center justify-center mx-auto p-8 gap-y-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 bg-white/10 w-2/3 p-6 mt-8">
                    <Dropdown
                        label="Select Operator"
                        options={operators}
                        onChange={handleOperatorChange}
                    />
                    <Dropdown
                        label="Select Game Type"
                        options={gameTypes}
                        onChange={handleGameTypeChange}
                    />
                    <Dropdown
                        label="Select Slate Name"
                        options={slateNames}
                        onChange={handleSlateNameChange}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                    <PlayerTable
                        players={selectedSlate}
                        onPlayerSelect={setSelectedPlayer}
                        selectedPlayer={selectedPlayer}
                    />
                    {selectedPlayer && (
                        <PlayerDetails player={selectedPlayer} />
                    )}
                </div>
            </div>
        </>
    );
};

export default Page;
