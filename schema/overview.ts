import { MAX_DATE_RANGE } from "@/lib/cosstants";
import { differenceInDays } from "date-fns";
import { z } from "zod";

export const OverviewQuerySchema = z.object({
    from: z.coerce.date(),
    to: z.coerce.date(),
}).refine((args)=>{
    const { from, to } = args;
    const days = differenceInDays(to, from);
    const isVaildRange = days >= 0  && days <= MAX_DATE_RANGE;
    return isVaildRange;
})