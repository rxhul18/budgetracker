"use client"
import { DateRangePicker } from '@/components/ui/date-range-picker';
import { MAX_DATE_RANGE } from '@/lib/cosstants';
import { UserSettings } from '@prisma/client';
import { differenceInDays, startOfMonth } from 'date-fns';
import React, { useState } from 'react'
import { toast } from 'sonner';
import StatsCards from './StatsCards';

interface Props {
  userSettings: UserSettings
}

function Overview({ userSettings }: Props) {
  const [dateRange, setDateRange] = useState<{ from: Date, to: Date }>({
    from: startOfMonth(new Date()),
    to: new Date()
  })



  return (
    <div className='flex flex-col justify-center items-center px-4'>
      <div className='container flex flex-wrap items-end justify-between gap-2 py-6'>
        <h2 className="text-3xl font-bold">Overview</h2>
        <div className="flex items-center gap-3">
          <DateRangePicker
            initialDateFrom={dateRange.from}
            initialDateTo={dateRange.to}
            showCompare={false}
            onUpdate={(values) => {
              const { from, to } = values.range

              if (!from || !to) return
              if (differenceInDays(to, from) > MAX_DATE_RANGE) {
                toast.error(`The selected date range is too big. Max allowed range is ${MAX_DATE_RANGE} days!`)
                return
              }

              setDateRange({ from, to })
            }}
          />
        </div>
      </div>
      <div className='container flex w-full flex-col gap-2'>
        <StatsCards userSettings={userSettings} from={dateRange.from} to={dateRange.to} />
      </div>
    </div>
  )
}

export default Overview;