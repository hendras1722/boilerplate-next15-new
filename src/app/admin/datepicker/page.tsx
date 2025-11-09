"use client";
import { useState } from "react";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
import { Calendar, DateRange } from "@/components/ui/DatePickerRange";
import { Icon } from "@iconify/react";

export default function CalendarDocumentation() {
  // States untuk berbagai demo
  const [selectedSingleDate, setSelectedSingleDate]       = useState<CalendarDate | undefined>(
    new CalendarDate(2025, 10, 21)
  );
  const [selectedRangeDate, setSelectedRangeDate]         = useState<DateRange | null>({
    start: new CalendarDate(2025, 10, 15),
    end: new CalendarDate(2025, 10, 25),
  });
  const [selectedMultipleDates, setSelectedMultipleDates] = useState<CalendarDate[]>([
    new CalendarDate(2025, 10, 5),
    new CalendarDate(2025, 10, 12),
    new CalendarDate(2025, 10, 19),
  ]);
  const [time, setTime]                                   = useState({ hour: 19, minute: 0 }); // ✅ Ubah dari 12 ke 19
  const [activeSection, setActiveSection]                 = useState<string | null>("single");

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const handleTimeChange = (hour: number, minute: number) => {
    setTime({ hour, minute });
  };

  const finalDate = selectedSingleDate
    ? (() => {
        const d = selectedSingleDate.toDate(getLocalTimeZone());
        d.setHours(time.hour, time.minute, 0, 0);
        return d;
      })()
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            📅 Calendar Component Documentation
          </h1>
          <p className="text-gray-600 text-lg">
            Komponen Calendar yang fleksibel dengan dukungan single date, date range, multiple
            dates, dan time picker.
          </p>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold text-blue-900">Single Date</h3>
              <p className="text-sm text-blue-700">Pilih satu tanggal</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="text-2xl mb-2">📊</div>
              <h3 className="font-semibold text-green-900">Date Range</h3>
              <p className="text-sm text-green-700">Pilih rentang tanggal</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-2xl mb-2">🔢</div>
              <h3 className="font-semibold text-purple-900">Multiple Dates</h3>
              <p className="text-sm text-purple-700">Pilih banyak tanggal</p>
            </div>
          </div>
        </div>

        {/* Props Documentation */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📖 Props Reference</h2>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Prop</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Default</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">range</td>
                  <td className="px-4 py-3 font-mono text-xs">boolean</td>
                  <td className="px-4 py-3 font-mono text-xs">false</td>
                  <td className="px-4 py-3 text-gray-600">Enable date range selection</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">multiple</td>
                  <td className="px-4 py-3 font-mono text-xs">boolean</td>
                  <td className="px-4 py-3 font-mono text-xs">false</td>
                  <td className="px-4 py-3 text-gray-600">Enable multiple date selection</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">monthControls</td>
                  <td className="px-4 py-3 font-mono text-xs">boolean</td>
                  <td className="px-4 py-3 font-mono text-xs">true</td>
                  <td className="px-4 py-3 text-gray-600">Show month navigation buttons</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">yearControls</td>
                  <td className="px-4 py-3 font-mono text-xs">boolean</td>
                  <td className="px-4 py-3 font-mono text-xs">true</td>
                  <td className="px-4 py-3 text-gray-600">Show year navigation buttons</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">showYearPicker</td>
                  <td className="px-4 py-3 font-mono text-xs">boolean</td>
                  <td className="px-4 py-3 font-mono text-xs">false</td>
                  <td className="px-4 py-3 text-gray-600">Show year picker dropdown</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">showMonthPicker</td>
                  <td className="px-4 py-3 font-mono text-xs">boolean</td>
                  <td className="px-4 py-3 font-mono text-xs">false</td>
                  <td className="px-4 py-3 text-gray-600">Show month picker dropdown</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">showTimePicker</td>
                  <td className="px-4 py-3 font-mono text-xs">boolean</td>
                  <td className="px-4 py-3 font-mono text-xs">false</td>
                  <td className="px-4 py-3 text-gray-600">Show time picker</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">use24HourFormat</td>
                  <td className="px-4 py-3 font-mono text-xs">boolean</td>
                  <td className="px-4 py-3 font-mono text-xs">true</td>
                  <td className="px-4 py-3 text-gray-600">Use 24-hour time format</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">defaultHour</td>
                  <td className="px-4 py-3 font-mono text-xs">number</td>
                  <td className="px-4 py-3 font-mono text-xs">current hour</td>
                  <td className="px-4 py-3 text-gray-600">Default hour value (0-23)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">defaultMinute</td>
                  <td className="px-4 py-3 font-mono text-xs">number</td>
                  <td className="px-4 py-3 font-mono text-xs">current minute</td>
                  <td className="px-4 py-3 text-gray-600">Default minute value (0-59)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">numberOfMonths</td>
                  <td className="px-4 py-3 font-mono text-xs">number</td>
                  <td className="px-4 py-3 font-mono text-xs">1</td>
                  <td className="px-4 py-3 text-gray-600">Number of months to display</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">fixedWeeks</td>
                  <td className="px-4 py-3 font-mono text-xs">boolean</td>
                  <td className="px-4 py-3 font-mono text-xs">true</td>
                  <td className="px-4 py-3 text-gray-600">Always show 6 weeks</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">hideWeekdays</td>
                  <td className="px-4 py-3 font-mono text-xs">boolean</td>
                  <td className="px-4 py-3 font-mono text-xs">false</td>
                  <td className="px-4 py-3 text-gray-600">Hide weekday labels</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">color</td>
                  <td className="px-4 py-3 font-mono text-xs">ColorType</td>
                  <td className="px-4 py-3 font-mono text-xs">"primary"</td>
                  <td className="px-4 py-3 text-gray-600">
                    primary | secondary | success | warning | error | neutral
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">variant</td>
                  <td className="px-4 py-3 font-mono text-xs">VariantType</td>
                  <td className="px-4 py-3 font-mono text-xs">"solid"</td>
                  <td className="px-4 py-3 text-gray-600">solid | soft | outline | ghost</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">size</td>
                  <td className="px-4 py-3 font-mono text-xs">SizeType</td>
                  <td className="px-4 py-3 font-mono text-xs">"md"</td>
                  <td className="px-4 py-3 text-gray-600">sm | md | lg</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">locale</td>
                  <td className="px-4 py-3 font-mono text-xs">string</td>
                  <td className="px-4 py-3 font-mono text-xs">"en-US"</td>
                  <td className="px-4 py-3 text-gray-600">Locale for date formatting</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">minValue</td>
                  <td className="px-4 py-3 font-mono text-xs">DateValue</td>
                  <td className="px-4 py-3 font-mono text-xs">-</td>
                  <td className="px-4 py-3 text-gray-600">Minimum selectable date</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">maxValue</td>
                  <td className="px-4 py-3 font-mono text-xs">DateValue</td>
                  <td className="px-4 py-3 font-mono text-xs">-</td>
                  <td className="px-4 py-3 text-gray-600">Maximum selectable date</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">onChange</td>
                  <td className="px-4 py-3 font-mono text-xs">function</td>
                  <td className="px-4 py-3 font-mono text-xs">-</td>
                  <td className="px-4 py-3 text-gray-600">Callback when date changes</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-mono text-blue-600">onTimeChange</td>
                  <td className="px-4 py-3 font-mono text-xs">function</td>
                  <td className="px-4 py-3 font-mono text-xs">-</td>
                  <td className="px-4 py-3 text-gray-600">Callback when time changes</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Demo 1: Single Date with Time */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection("single")}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎯</span>
              <h2 className="text-2xl font-bold text-gray-900">Single Date + Time Picker</h2>
            </div>
            <Icon
              icon={activeSection === "single" ? "lucide:chevron-up" : "lucide:chevron-down"}
              className="w-6 h-6"
            />
          </button>

          {activeSection === "single" && (
            <div className="p-6 border-t border-gray-200 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Calendar
                  value={selectedSingleDate}
                  onChange={(value: any) => setSelectedSingleDate(value)}
                  onTimeChange={handleTimeChange}
                  numberOfMonths={1}
                  fixedWeeks
                  showYearPicker
                  showMonthPicker
                  showTimePicker
                  use24HourFormat
                  defaultHour={19}
                  defaultMinute={0}
                  color="primary"
                  variant="solid"
                />
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg space-y-2 font-mono text-sm border border-blue-200">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">📆 Selected Date:</span>
                  <span className="text-blue-700 font-medium">
                    {selectedSingleDate?.toString() ?? "-"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">⏰ Time:</span>
                  <span className="text-green-700 font-medium">
                    {String(time.hour).padStart(2, "0")}:{String(time.minute).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">🌍 JS Date:</span>
                  <span className="text-purple-700 font-medium text-xs">
                    {finalDate?.toISOString() ?? "-"}
                  </span>
                </div>
              </div>

              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs">{`<Calendar
  value={selectedDate}
  onChange={(value) => setSelectedDate(value)}
  onTimeChange={(hour, minute) => setTime({ hour, minute })}
  showTimePicker
  use24HourFormat
  defaultHour={9}      // Set default hour to 9 AM
  defaultMinute={0}    // Set default minute to 0
  showYearPicker
  showMonthPicker
  color="primary"
  variant="solid"
/>`}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Demo 2: Date Range */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection("range")}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <h2 className="text-2xl font-bold text-gray-900">Date Range Selection</h2>
            </div>
            <Icon
              icon={activeSection === "range" ? "lucide:chevron-up" : "lucide:chevron-down"}
              className="w-6 h-6"
            />
          </button>

          {activeSection === "range" && (
            <div className="p-6 border-t border-gray-200 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Calendar
                  range
                  value={selectedRangeDate}
                  onChange={(value: any) => setSelectedRangeDate(value)}
                  numberOfMonths={2}
                  color="success"
                  variant="soft"
                />
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg space-y-2 font-mono text-sm border border-green-200">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">📅 Start Date:</span>
                  <span className="text-green-700 font-medium">
                    {selectedRangeDate?.start?.toString() ?? "-"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">📅 End Date:</span>
                  <span className="text-green-700 font-medium">
                    {selectedRangeDate?.end?.toString() ?? "-"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">📊 Duration:</span>
                  <span className="text-emerald-700 font-medium">
                    {selectedRangeDate?.start && selectedRangeDate?.end
                      ? `${Math.abs(selectedRangeDate.end.compare(selectedRangeDate.start)) + 1} days`
                      : "-"}
                  </span>
                </div>
              </div>

              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs">{`<Calendar
  range
  value={dateRange}
  onChange={(value) => setDateRange(value)}
  numberOfMonths={2}
  color="success"
  variant="soft"
/>`}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Demo 3: Multiple Dates */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection("multiple")}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔢</span>
              <h2 className="text-2xl font-bold text-gray-900">Multiple Dates Selection</h2>
            </div>
            <Icon
              icon={activeSection === "multiple" ? "lucide:chevron-up" : "lucide:chevron-down"}
              className="w-6 h-6"
            />
          </button>

          {activeSection === "multiple" && (
            <div className="p-6 border-t border-gray-200 space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <Calendar
                  multiple
                  value={selectedMultipleDates}
                  onChange={(value: any) => setSelectedMultipleDates(value)}
                  color="warning"
                  variant="outline"
                />
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg space-y-2 font-mono text-sm border border-amber-200">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-700">📋 Selected Dates:</span>
                  <span className="text-amber-700 font-medium">
                    {selectedMultipleDates.length} date(s)
                  </span>
                </div>
                <div className="space-y-1 mt-2">
                  {selectedMultipleDates.map((date, index) => (
                    <div key={index} className="text-amber-700 text-xs">
                      • {date.toString()}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs">{`<Calendar
  multiple
  value={selectedDates}
  onChange={(value) => setSelectedDates(value)}
  color="warning"
  variant="outline"
/>`}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Demo 4: Custom Styling */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection("styling")}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">🎨</span>
              <h2 className="text-2xl font-bold text-gray-900">Color & Variant Options</h2>
            </div>
            <Icon
              icon={activeSection === "styling" ? "lucide:chevron-up" : "lucide:chevron-down"}
              className="w-6 h-6"
            />
          </button>

          {activeSection === "styling" && (
            <div className="p-6 border-t border-gray-200 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Solid Variants */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-700">Solid Variant</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <Calendar
                      value={new CalendarDate(2025, 10, 15)}
                      color="error"
                      variant="solid"
                      size="sm"
                      monthControls={false}
                      yearControls={false}
                    />
                  </div>
                  <code className="text-xs bg-gray-900 text-gray-100 p-2 rounded block">
                    color="error" variant="solid"
                  </code>
                </div>

                {/* Ghost Variant */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-700">Ghost Variant</h3>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <Calendar
                      value={new CalendarDate(2025, 10, 15)}
                      color="secondary"
                      variant="ghost"
                      size="sm"
                      monthControls={false}
                      yearControls={false}
                    />
                  </div>
                  <code className="text-xs bg-gray-900 text-gray-100 p-2 rounded block">
                    color="secondary" variant="ghost"
                  </code>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 mb-2">Available Colors:</h3>
                <div className="flex flex-wrap gap-2">
                  {["primary", "secondary", "success", "warning", "error", "neutral"].map(
                    (color) => (
                      <span
                        key={color}
                        className="px-3 py-1 bg-white rounded-full text-sm border border-blue-200"
                      >
                        {color}
                      </span>
                    )
                  )}
                </div>
                <h3 className="font-semibold text-blue-900 mt-4 mb-2">Available Variants:</h3>
                <div className="flex flex-wrap gap-2">
                  {["solid", "soft", "outline", "ghost"].map((variant) => (
                    <span
                      key={variant}
                      className="px-3 py-1 bg-white rounded-full text-sm border border-blue-200"
                    >
                      {variant}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Demo 5: Advanced Features */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          <button
            onClick={() => toggleSection("advanced")}
            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">⚙️</span>
              <h2 className="text-2xl font-bold text-gray-900">Advanced Features</h2>
            </div>
            <Icon
              icon={activeSection === "advanced" ? "lucide:chevron-up" : "lucide:chevron-down"}
              className="w-6 h-6"
            />
          </button>

          {activeSection === "advanced" && (
            <div className="p-6 border-t border-gray-200 space-y-6">
              {/* Min/Max Dates */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                  <span>📅</span> Date Constraints (Min/Max)
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Calendar
                    value={new CalendarDate(2025, 10, 15)}
                    minValue={new CalendarDate(2025, 10, 10)}
                    maxValue={new CalendarDate(2025, 10, 20)}
                    color="primary"
                  />
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs">{`<Calendar
  minValue={new CalendarDate(2025, 10, 10)}
  maxValue={new CalendarDate(2025, 10, 20)}
/>`}</pre>
                </div>
              </div>

              {/* Disable Specific Dates */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                  <span>🚫</span> Disable Specific Dates
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <Calendar
                    value={new CalendarDate(2025, 10, 15)}
                    isDateUnavailable={(date) => {
                      // Disable weekends
                      const day = new Date(date.year, date.month - 1, date.day).getDay();
                      return day === 0 || day === 6;
                    }}
                    color="success"
                  />
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs">{`<Calendar
  isDateUnavailable={(date) => {
    // Disable weekends
    const day = new Date(date.year, date.month - 1, date.day).getDay();
    return day === 0 || day === 6;
  }}
/>`}</pre>
                </div>
              </div>

              {/* Multiple Months */}
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-700 flex items-center gap-2">
                  <span>📆</span> Multiple Months Display
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg overflow-x-auto">
                  <Calendar range numberOfMonths={3} color="warning" variant="soft" />
                </div>
                <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                  <pre className="text-xs">{`<Calendar
  range
  numberOfMonths={3}
/>`}</pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">💡 Best Practices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">✅ Do's</h3>
              <ul className="space-y-2 text-sm text-blue-50">
                <li>
                  • Use{" "}
                  <code className="bg-blue-500 px-2 py-0.5 rounded">@internationalized/date</code>{" "}
                  untuk type-safe date handling
                </li>
                <li>
                  • Implement <code className="bg-blue-500 px-2 py-0.5 rounded">onChange</code> dan{" "}
                  <code className="bg-blue-500 px-2 py-0.5 rounded">onTimeChange</code> callbacks
                </li>
                <li>
                  • Use <code className="bg-blue-500 px-2 py-0.5 rounded">minValue</code> dan{" "}
                  <code className="bg-blue-500 px-2 py-0.5 rounded">maxValue</code> untuk date
                  constraints
                </li>
                <li>
                  • Gunakan <code className="bg-blue-500 px-2 py-0.5 rounded">locale</code> prop
                  untuk internationalization
                </li>
                <li>
                  • Set appropriate <code className="bg-blue-500 px-2 py-0.5 rounded">color</code>{" "}
                  dan <code className="bg-blue-500 px-2 py-0.5 rounded">variant</code> sesuai UI
                  theme
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">❌ Don'ts</h3>
              <ul className="space-y-2 text-sm text-blue-50">
                <li>• Jangan gunakan native JS Date objects langsung</li>
                <li>
                  • Jangan combine <code className="bg-blue-500 px-2 py-0.5 rounded">range</code>{" "}
                  dan <code className="bg-blue-500 px-2 py-0.5 rounded">multiple</code> props
                  bersamaan
                </li>
                <li>
                  • Jangan lupa handle <code className="bg-blue-500 px-2 py-0.5 rounded">null</code>{" "}
                  values di callbacks
                </li>
                <li>
                  • Jangan set{" "}
                  <code className="bg-blue-500 px-2 py-0.5 rounded">numberOfMonths</code> terlalu
                  besar (max 3-4)
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-500 rounded-lg">
            <h3 className="font-semibold mb-2">📚 Related Imports</h3>
            <pre className="text-xs text-blue-50 overflow-x-auto">
              <code>{`import { Calendar, DateRange } from "@/components/ui/DatePickerRange";
import { CalendarDate, getLocalTimeZone } from "@internationalized/date";`}</code>
            </pre>
          </div>
        </div>

        {/* Type Reference */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">📝 TypeScript Types</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-gray-700 mb-2">DateRange Interface</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs">{`interface DateRange {
  start: DateValue;
  end: DateValue | null;
}`}</pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Calendar Value Types</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs">{`// Single date mode
const [date, setDate] = useState<CalendarDate | undefined>();

// Range mode
const [range, setRange] = useState<DateRange | null>();

// Multiple dates mode
const [dates, setDates] = useState<CalendarDate[]>();`}</pre>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-700 mb-2">Working with Time</h3>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs">{`const [time, setTime] = useState({ hour: 0, minute: 0 });

// Combine date + time
const finalDate = selectedDate
  ? (() => {
      const d = selectedDate.toDate(getLocalTimeZone());
      d.setHours(time.hour, time.minute, 0, 0);
      return d;
    })()
  : null;`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Common Patterns */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🎯 Common Use Cases</h2>

          <div className="space-y-6">
            {/* Use Case 1 */}
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">📅 Booking System (Date Range)</h3>
              <p className="text-sm text-gray-600 mb-3">
                Perfect untuk sistem booking hotel, tiket, atau rental
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs">{`const [bookingRange, setBookingRange] = useState<DateRange | null>(null);

<Calendar
  range
  value={bookingRange}
  onChange={setBookingRange}
  numberOfMonths={2}
  minValue={new CalendarDate(2025, 10, 1)}
  isDateUnavailable={(date) => {
    // Block booked dates
    return bookedDates.includes(date.toString());
  }}
/>`}</pre>
              </div>
            </div>

            {/* Use Case 2 */}
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                🗓️ Event Scheduler (Multiple Dates)
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Untuk memilih beberapa tanggal event atau meeting
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs">{`const [eventDates, setEventDates] = useState<CalendarDate[]>([]);

<Calendar
  multiple
  value={eventDates}
  onChange={setEventDates}
  color="success"
  variant="soft"
  isDateUnavailable={(date) => {
    // Disable past dates
    const today = new CalendarDate(
      new Date().getFullYear(),
      new Date().getMonth() + 1,
      new Date().getDate()
    );
    return date.compare(today) < 0;
  }}
/>`}</pre>
              </div>
            </div>

            {/* Use Case 3 */}
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">
                ⏰ Appointment System (Date + Time)
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                Untuk scheduling appointment dengan waktu spesifik
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs">{`const [appointmentDate, setAppointmentDate] = useState<CalendarDate>();
const [appointmentTime, setAppointmentTime] = useState({ hour: 9, minute: 0 });

<Calendar
  value={appointmentDate}
  onChange={setAppointmentDate}
  onTimeChange={(h, m) => setAppointmentTime({ hour: h, minute: m })}
  showTimePicker
  use24HourFormat
  defaultHour={9}      // Default to 9 AM
  defaultMinute={0}    // Default to 0 minutes
  isDateUnavailable={(date) => {
    // Disable weekends and holidays
    const day = new Date(date.year, date.month - 1, date.day).getDay();
    return day === 0 || day === 6 || holidays.includes(date.toString());
  }}
/>`}</pre>
              </div>
            </div>

            {/* Use Case 4 */}
            <div className="border-l-4 border-amber-500 pl-4">
              <h3 className="font-semibold text-gray-900 mb-2">🎂 Birthday Picker (Year Range)</h3>
              <p className="text-sm text-gray-600 mb-3">
                Untuk input tanggal lahir dengan year picker
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <pre className="text-xs">{`const [birthday, setBirthday] = useState<CalendarDate>();

<Calendar
  value={birthday}
  onChange={setBirthday}
  showYearPicker
  showMonthPicker
  minYear={1950}
  maxYear={new Date().getFullYear()}
  maxValue={new CalendarDate(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    new Date().getDate()
  )}
  color="warning"
/>`}</pre>
              </div>
            </div>
          </div>
        </div>

        {/* Locale Examples */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">🌍 Internationalization</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">🇮🇩 Indonesia</h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                <Calendar
                  value={new CalendarDate(2025, 10, 15)}
                  locale="id-ID"
                  size="sm"
                  monthControls={false}
                  yearControls={false}
                />
              </div>
              <code className="text-xs bg-gray-900 text-gray-100 p-2 rounded block">
                locale="id-ID"
              </code>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">🇺🇸 English (US)</h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                <Calendar
                  value={new CalendarDate(2025, 10, 15)}
                  locale="en-US"
                  size="sm"
                  monthControls={false}
                  yearControls={false}
                />
              </div>
              <code className="text-xs bg-gray-900 text-gray-100 p-2 rounded block">
                locale="en-US"
              </code>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-700">🇯🇵 Japanese</h3>
              <div className="bg-gray-50 p-3 rounded-lg">
                <Calendar
                  value={new CalendarDate(2025, 10, 15)}
                  locale="ja-JP"
                  size="sm"
                  monthControls={false}
                  yearControls={false}
                />
              </div>
              <code className="text-xs bg-gray-900 text-gray-100 p-2 rounded block">
                locale="ja-JP"
              </code>
            </div>
          </div>

          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>💡 Tip:</strong> Calendar component mendukung semua locale yang valid sesuai
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl"
                className="underline ml-1"
                target="_blank"
                rel="noopener noreferrer"
              >
                Intl API
              </a>
            </p>
          </div>
        </div>

        {/* FAQ */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">❓ Frequently Asked Questions</h2>

          <div className="space-y-4">
            <details className="group border border-gray-200 rounded-lg">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50 flex items-center justify-between">
                <span>Bagaimana cara set default time value?</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-600 mb-2">
                  Gunakan prop <code className="bg-gray-200 px-2 py-0.5 rounded">defaultHour</code>{" "}
                  dan <code className="bg-gray-200 px-2 py-0.5 rounded">defaultMinute</code>:
                </p>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs">
                  <pre>{`<Calendar
  showTimePicker
  defaultHour={9}      // Set to 9 AM
  defaultMinute={30}   // Set to 30 minutes
  onTimeChange={(hour, minute) => {
    console.log(\`Time: \${hour}:\${minute}\`);
  }}
/>`}</pre>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Jika tidak di-set, akan menggunakan waktu saat ini.
                </p>
              </div>
            </details>

            <details className="group border border-gray-200 rounded-lg">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50 flex items-center justify-between">
                <span>Bagaimana cara convert CalendarDate ke JS Date?</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-600 mb-2">
                  Gunakan method <code className="bg-gray-200 px-2 py-0.5 rounded">toDate()</code>:
                </p>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs">
                  <pre>{`import { getLocalTimeZone } from "@internationalized/date";

const calendarDate = new CalendarDate(2025, 10, 21);
const jsDate = calendarDate.toDate(getLocalTimeZone());`}</pre>
                </div>
              </div>
            </details>

            <details className="group border border-gray-200 rounded-lg">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50 flex items-center justify-between">
                <span>Bagaimana cara disable specific dates?</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-600 mb-2">
                  Gunakan prop{" "}
                  <code className="bg-gray-200 px-2 py-0.5 rounded">isDateUnavailable</code>:
                </p>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs">
                  <pre>{`<Calendar
  isDateUnavailable={(date) => {
    // Disable weekends
    const jsDate = new Date(date.year, date.month - 1, date.day);
    const dayOfWeek = jsDate.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  }}
/>`}</pre>
                </div>
              </div>
            </details>

            <details className="group border border-gray-200 rounded-lg">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50 flex items-center justify-between">
                <span>Apakah bisa custom styling untuk days?</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-600 mb-2">
                  Ya, gunakan <code className="bg-gray-200 px-2 py-0.5 rounded">slots</code> prop:
                </p>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs">
                  <pre>{`<Calendar
  slots={{
    day: ({ day }) => (
      <div className="custom-day">
        {day.day}
      </div>
    ),
    weekDay: ({ day }) => (
      <div className="custom-weekday">
        {day}
      </div>
    )
  }}
/>`}</pre>
                </div>
              </div>
            </details>

            <details className="group border border-gray-200 rounded-lg">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50 flex items-center justify-between">
                <span>Bagaimana cara set initial value?</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-600 mb-2">
                  Gunakan prop <code className="bg-gray-200 px-2 py-0.5 rounded">defaultValue</code>{" "}
                  atau <code className="bg-gray-200 px-2 py-0.5 rounded">value</code>:
                </p>
                <div className="bg-gray-900 text-gray-100 p-3 rounded text-xs">
                  <pre>{`// Uncontrolled
<Calendar defaultValue={new CalendarDate(2025, 10, 21)} />

// Controlled
const [date, setDate] = useState(new CalendarDate(2025, 10, 21));
<Calendar value={date} onChange={setDate} />`}</pre>
                </div>
              </div>
            </details>

            <details className="group border border-gray-200 rounded-lg">
              <summary className="cursor-pointer p-4 font-semibold text-gray-900 hover:bg-gray-50 flex items-center justify-between">
                <span>Performance tips untuk large date ranges?</span>
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>
                    • Gunakan{" "}
                    <code className="bg-gray-200 px-2 py-0.5 rounded">fixedWeeks={`false`}</code>{" "}
                    jika tidak perlu 6 minggu konsisten
                  </li>
                  <li>
                    • Limit <code className="bg-gray-200 px-2 py-0.5 rounded">numberOfMonths</code>{" "}
                    ke maksimal 3-4
                  </li>
                  <li>
                    • Memoize{" "}
                    <code className="bg-gray-200 px-2 py-0.5 rounded">isDateUnavailable</code>{" "}
                    callback jika kompleks
                  </li>
                  <li>
                    • Gunakan <code className="bg-gray-200 px-2 py-0.5 rounded">minYear</code> dan{" "}
                    <code className="bg-gray-200 px-2 py-0.5 rounded">maxYear</code> untuk limit
                    year picker range
                  </li>
                </ul>
              </div>
            </details>
          </div>
        </div>

        {/* Credits */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl shadow-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">✨ Calendar Component</h2>
          <p className="text-gray-300 mb-2">
            Built with React, TypeScript, and @internationalized/date
          </p>
          <p className="text-gray-400 text-sm">
            Full-featured calendar with range selection, multiple dates, time picker, and more
          </p>
          <div className="mt-6 flex items-center justify-center gap-4 text-sm">
            <span className="bg-gray-700 px-3 py-1 rounded-full">React 18+</span>
            <span className="bg-gray-700 px-3 py-1 rounded-full">TypeScript</span>
            <span className="bg-gray-700 px-3 py-1 rounded-full">Tailwind CSS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
