"use client";

import { Calendar, type DateRange } from "@/components/ui/DatePickerRange";
import { CalendarDate } from "@internationalized/date";
import { definePage } from "@/lib/definePage";
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { MultiSelect, type MultiSelectItem } from "@/components/ui/MultiSelect";

definePage({
  meta: {
    activeMenu: ["detail"],
    layout: "admin",
  },
});

export default function TestLoggerPage() {
  const [rangeDate, setRangeDate]     = useState<DateRange | null>({
    start: new CalendarDate(2025, 10, 21),
    end: new CalendarDate(2025, 10, 21),
  });
  const [singleValue, setSingleValue] = useState<
    MultiSelectItem | MultiSelectItem[] | undefined
  >();
  const [postValue, setPostValue]     = useState<
    MultiSelectItem | MultiSelectItem[] | undefined
  >({ value: 91, label: "aut amet sed" });
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">🧩 Logger Test Page</h1>
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              MultiSelect Component Demo
            </h1>
            <p className="text-gray-600">
              Select from real API data with pagination support
            </p>
          </div>

          {/* Single Select with API */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Single Select - Countries (API)
            </label>
            <MultiSelect
              placeholder="Select a country..."
              value={singleValue}
              onChange={setSingleValue}
              url="https://restcountries.com/v3.1/all"
              paginated={false}
              transformFetchData={(result: any) => {
                return (Array.isArray(result) ? result : [])
                  .slice(0, 50)
                  .map((country) => ({
                    value: country.cca2 || "",
                    label: country.name?.common || "",
                  }))
                  .sort((a, b) => a.label.localeCompare(b.label));
              }}
              transformFetchQuery={({ q }) => {
                return { search: q };
              }}
            />
            {singleValue && !Array.isArray(singleValue) && (
              <p className="text-sm text-gray-600">
                Selected:{" "}
                <span className="font-medium">{singleValue.label}</span>
              </p>
            )}
          </div>

          {/* Multiple Select with API */}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Static Items (No API)
            </label>
            <MultiSelect
              placeholder="Select status..."
              items={[
                { value: "backlog", label: "Backlog", icon: "mdi:inbox" },
                {
                  value: "todo",
                  label: "Todo",
                  icon: "mdi:format-list-checks",
                },
                {
                  value: "in-progress",
                  label: "In Progress",
                  icon: "mdi:progress-clock",
                },
                { value: "done", label: "Done", icon: "mdi:check-circle" },
              ]}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Variants</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-700">
                  Outline
                </label>
                <MultiSelect
                  variant="outline"
                  placeholder="Outline..."
                  items={[]}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-700">
                  Solid
                </label>
                <MultiSelect
                  variant="solid"
                  placeholder="Solid..."
                  items={[]}
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-medium text-gray-700">
                  Soft
                </label>
                <MultiSelect variant="soft" placeholder="Soft..." items={[]} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Scroll Test (Auto Position)
            </label>
            <p className="text-xs text-gray-500 mb-2">
              Try opening this at the bottom of the viewport - dropdown will
              appear above!
            </p>
            <MultiSelect
              placeholder="Scroll down and try me..."
              items={Array.from({ length: 20 }, (_, i) => ({
                value: i,
                label: `Item ${i + 1}`,
              }))}
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Multiple Select - Users (API with Pagination)
            </label>
            <MultiSelect
              placeholder="Select a post..."
              url="https://jsonplaceholder.typicode.com/posts"
              value={postValue}
              onChange={setPostValue}
              limit={10}
              paginated
              variant="outline"
              size="md"
              multiple
              transformFetchData={(result: any) => {
                const posts = Array.isArray(result)
                  ? result
                  : (result?.data ?? []);
                return posts.map((post: any) => ({
                  value: post.id,
                  label: post.title,
                  icon: "mdi:file-document-outline",
                }));
              }}
              transformFetchQuery={(params) => ({
                _page: params.page,
                _limit: params.limit,
                q: params.search,
              })}
            />

            {postValue && !Array.isArray(postValue) && (
              <p className="text-sm text-gray-600 mt-1">
                Selected:{" "}
                <span className="font-medium">{JSON.stringify(postValue)}</span>
              </p>
            )}
          </div>
        </div>
      </div>
      <Card className="p-5 w-[540px]">
        <Calendar
          range
          value={rangeDate}
          onChange={(newRange) => setRangeDate(newRange as DateRange | null)}
          numberOfMonths={1}
          fixedWeeks={true}
          minValue={new CalendarDate(2025, 10, 21)}
          size="sm"
        />
      </Card>
    </div>
  );
}
