"use client";

import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { GetFormatterForCurrency } from '@/lib/helpers';
import { Period, Timeframe } from '@/lib/types';
import { UserSettings } from '@prisma/client';
import React, { useMemo, useState } from 'react'
import HistoryPeriodSelector from './HistoryPeriodSelector';

export default function History({
    userSettings
}: {
    userSettings: UserSettings
}) {
    const [timeframe, setTimeframe] = useState<Timeframe>("month")
    const [period, setPeriod] = useState<Period>({
        month: new Date().getMonth(),
        year: new Date().getFullYear()
    })

    const formatter = useMemo(() => {
        return GetFormatterForCurrency(userSettings.currency)
    }, [userSettings.currency])

    return (
        <div className='flex flex-col justify-center items-center px-4'>
            <div className='container'>
                <h2 className="mt-12 text-3xl font-bold">History</h2>
                <Card className='col-span-12 mt-2 w-full'>
                    <CardHeader className='gap-2'>
                        <CardTitle className='gird grid-flow-row justify-between gap-2 md:grid-flow-col flex'>
                            <HistoryPeriodSelector
                                period={period}
                                timeframe={timeframe}
                                setPeriod={setPeriod}
                                setTimeframe={setTimeframe}
                            />
                            <div className="flex h-10 gap-2">
                                <Badge
                                    variant={"outline"}
                                    className='flex items-center gap-2 text-sm rounded-full'
                                >
                                    <div className="size-4 rounded-full bg-emerald-500"></div>
                                    Income
                                </Badge>
                                <Badge
                                    variant={"outline"}
                                    className='flex items-center gap-2 text-sm rounded-full'
                                >
                                    <div className="size-4 rounded-full bg-red-500"></div>
                                    Expense
                                </Badge>
                            </div>
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
}
