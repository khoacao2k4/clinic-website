"use client";

import { useState, useEffect } from "react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VisitRecord } from "@/utils/db-schema";
import VisitRecordCard from "./record-card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const VisitRecordPlaceholder = () => (
  <>
    {[...Array(10)].map((_, i) => (
      <div key={i}
        className="h-[98px] rounded-xl border bg-gradient-to-b from-muted/40 to-muted/10 animate-pulse"
      />
    ))}
  </>
);

export default function RecordGrid({ patientId, records, onDeleted, loading = false, pageSizeDefault = 10 }: {
  patientId: string;
  records: VisitRecord[];
  onDeleted: () => void;
  loading?: boolean;
  pageSizeDefault?: number;
}) {
  // ---- pagination
  const [pageSize, setPageSize] = useState(pageSizeDefault);
  const [page, setPage] = useState(1);
  useEffect(() => setPage(1), [records, pageSize]);

  const total = records.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const curPage = Math.min(page, totalPages);
  const startIdx = (curPage - 1) * pageSize;
  const endIdx = Math.min(curPage * pageSize, total);
  const pageItems = loading ? [] : records.slice(startIdx, endIdx);

  const goFirst = () => setPage(1);
  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));
  const goLast = () => setPage(totalPages);

  return (
    <div className="flex flex-col">
      {/* GRID */}
      <div className="grid gap-3 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {loading ? 
          <VisitRecordPlaceholder />
          : pageItems.map((record) => (
            <VisitRecordCard 
              key={record.id}
              patientId={patientId}
              record={record}
            />
          ))}

        {!loading && !pageItems.length && (
          <div className="col-span-full rounded-xl border p-8 text-center text-sm text-muted-foreground">
            No records found.
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="mt-3 flex items-center justify-between rounded-lg border bg-background/60 px-3 py-2 text-sm backdrop-blur">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">Rows per page</span>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => setPageSize(Number(value))}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <span className="text-muted-foreground tabular-nums">
            {total ? `${startIdx + 1}–${endIdx} of ${total}` : "0 of 0"}
          </span>
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={goFirst}
            disabled={curPage === 1}
            aria-label="First page"
            className="h-8 w-8"
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goPrev}
            disabled={curPage === 1}
            aria-label="Previous page"
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <span className="mx-2 rounded-md border px-2 py-1 tabular-nums">
            {curPage} / {totalPages}
          </span>

          <Button
            variant="ghost"
            size="icon"
            onClick={goNext}
            disabled={curPage === totalPages}
            aria-label="Next page"
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goLast}
            disabled={curPage === totalPages}
            aria-label="Last page"
            className="h-8 w-8"
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
