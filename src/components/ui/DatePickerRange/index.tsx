import React, { forwardRef, useImperativeHandle, useMemo } from 'react';
import {
  CalendarDate,
  DateValue,
  startOfWeek,
  getWeeksInMonth,
} from '@internationalized/date';
import { Icon } from '@iconify/react';

// Types
export interface DateRange {
  start: DateValue;
  end: DateValue | null;
}

export type CalendarDefaultValue<R extends boolean = false, M extends boolean = false> =
  R extends true ? DateRange :
  M extends true ? DateValue[] :
  DateValue;

export type CalendarModelValue<R extends boolean = false, M extends boolean = false> =
  R extends true ? (DateRange | null) :
  M extends true ? (DateValue[]) :
  (DateValue | undefined);

interface ButtonProps {
  color?: string;
  variant?: string;
  size?: string;
}

type ColorType = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'neutral';
type VariantType = 'solid' | 'soft' | 'outline' | 'ghost';
type SizeType = 'sm' | 'md' | 'lg';

interface CalendarProps<R extends boolean = false, M extends boolean = false> {
  nextYearIcon?: React.ReactNode;
  nextYear?: ButtonProps;
  nextMonthIcon?: React.ReactNode;
  nextMonth?: ButtonProps;
  prevYearIcon?: React.ReactNode;
  prevYear?: ButtonProps;
  prevMonthIcon?: React.ReactNode;
  prevMonth?: ButtonProps;
  color?: ColorType;
  variant?: VariantType;
  size?: SizeType;
  range?: R & boolean;
  multiple?: M & boolean;
  monthControls?: boolean;
  yearControls?: boolean;
  fixedWeeks?: boolean;
  defaultValue?: CalendarDefaultValue<R, M>;
  value?: CalendarModelValue<R, M>;
  onChange?: (date: CalendarModelValue<R, M>) => void;
  className?: string;
  locale?: string;
  minValue?: DateValue;
  maxValue?: DateValue;
  isDateUnavailable?: (date: DateValue) => boolean;
  numberOfMonths?: number;
  hideWeekdays?: boolean;
  slots?: {
    heading?: (props: { value: string }) => React.ReactNode;
    day?: (props: { day: DateValue }) => React.ReactNode;
    weekDay?: (props: { day: string }) => React.ReactNode;
  };
}

interface SingleMonthCalendarProps {
  currentMonth: DateValue;
  locale: string;
  fixedWeeks: boolean;
  color: ColorType;
  variant: VariantType;
  size: SizeType;
  hideWeekdays: boolean;
  isDisabled: (date: DateValue) => boolean;
  isSelected: (date: DateValue) => boolean;
  isInSelectedRange: (date: DateValue) => boolean;
  handleDateClick: (date: DateValue) => void;
  slots: CalendarProps['slots'];
  weekDays: string[];
}

// Color variants configuration
const colorVariants: Record<ColorType, Record<VariantType | 'range' | 'today', string>> = {
  primary: {
    solid: 'bg-primary !text-white hover:bg-primary dark:text-white',
    soft: 'bg-primary text-white hover:bg-primary dark:text-white',
    outline: 'border-2 border-primary text-primary hover:bg-blue-50 dark:text-white',
    ghost: 'text-primary hover:bg-blue-50 dark:text-white',
    range: 'bg-primary !text-white dark:text-white',
    today: 'border-2 border-primary dark:text-white'
  },
  secondary: {
    solid: 'bg-secondary  text-white hover:bg-secondary  dark:text-white',
    soft: 'bg-secondary  text-secondary  hover:bg-secondary  dark:text-white',
    outline: 'border-2 border-secondary  text-secondary  hover:bg-secondary dark:text-white',
    ghost: 'text-secondary  hover:bg-secondary dark:text-white',
    range: 'bg-secondary  dark:text-white',
    today: 'border-2 border-secondary  dark:text-white'
  },
  success: {
    solid: 'bg-green-600 text-white hover:bg-green-700 dark:text-white',
    soft: 'bg-green-100 text-green-700 hover:bg-green-200 dark:text-white',
    outline: 'border-2 border-green-600 text-green-600 hover:bg-green-50 dark:text-white',
    ghost: 'text-green-600 hover:bg-green-50 dark:text-white',
    range: 'bg-green-100 dark:text-white',
    today: 'border-2 border-green-600 dark:text-white'
  },
  warning: {
    solid: 'bg-amber-600 text-white hover:bg-amber-700 dark:text-white',
    soft: 'bg-amber-100 text-amber-700 hover:bg-amber-200 dark:text-white',
    outline: 'border-2 border-amber-600 text-amber-600 hover:bg-amber-50 dark:text-white',
    ghost: 'text-amber-600 hover:bg-amber-50 dark:text-white',
    range: 'bg-amber-100 dark:text-white',
    today: 'border-2 border-amber-600 dark:text-white'
  },
  error: {
    solid: 'bg-red-600 text-white hover:bg-red-700 dark:text-white',
    soft: 'bg-red-100 text-red-700 hover:bg-red-200 dark:text-white',
    outline: 'border-2 border-red-600 text-red-600 hover:bg-red-50 dark:text-white',
    ghost: 'text-red-600 hover:bg-red-50 dark:text-white',
    range: 'bg-red-100 dark:text-white',
    today: 'border-2 border-red-600 dark:text-white'
  },
  neutral: {
    solid: 'bg-gray-600 text-white hover:bg-gray-700',
    soft: 'bg-gray-100 text-gray-700 hover:bg-gray-200',
    outline: 'border-2 border-gray-600 text-gray-600 hover:bg-gray-50',
    ghost: 'text-gray-600 hover:bg-gray-50',
    range: 'bg-gray-100',
    today: 'border-2 border-gray-600 dark:text-white'
  }
};

// Size configurations
const sizeConfig: Record<SizeType, { button: string; text: string; gap: string; padding: string }> = {
  sm: {
    button: 'h-7 w-7 text-xs',
    text: 'text-xs',
    gap: 'gap-0.5',
    padding: 'p-0'
  },
  md: {
    button: 'h-9 w-9 text-sm',
    text: 'text-sm',
    gap: 'gap-1',
    padding: 'p-0'
  },
  lg: {
    button: 'h-11 w-11 text-base',
    text: 'text-base',
    gap: 'gap-1.5',
    padding: 'p-0'
  }
};

// Button component
const Button: React.FC<{
  icon?: React.ReactNode;
  onClick?: () => void;
  'aria-label'?: string;
  className?: string;
}> = ({ icon, onClick, className, 'aria-label': ariaLabel }) => (
  <button
    onClick={onClick}
    aria-label={ariaLabel}
    className={`p-2 hover:bg-gray-100 rounded transition-colors ${className || ''}`}
  >
    {icon}
  </button>
);

// Helper functions
function getMonthName(date: DateValue, locale: string = 'en-US'): string {
  const jsDate = new Date(date.year, date.month - 1, date.day);
  return jsDate.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
}

function getWeekDayNames(locale: string = 'en-US'): string[] {
  const days: string[] = [];
  const baseDate = new Date(2024, 0, 7); // A Sunday

  for (let i = 0; i < 7; i++) {
    const date = new Date(baseDate);
    date.setDate(baseDate.getDate() + i);
    days.push(date.toLocaleDateString(locale, { weekday: 'short' }));
  }

  return days;
}

function isSameDay(a: DateValue | null | undefined, b: DateValue | null | undefined): boolean {
  if (!a || !b) return false;
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

function isInRange(date: DateValue, range: DateRange | null | undefined): boolean {
  if (!range || !range.start || !range.end) return false;

  const dateNum = date.year * 10000 + date.month * 100 + date.day;
  const startNum = range.start.year * 10000 + range.start.month * 100 + range.start.day;
  const endNum = range.end.year * 10000 + range.end.month * 100 + range.end.day;

  return dateNum >= startNum && dateNum <= endNum;
}

// Single Month Calendar Component
function SingleMonthCalendar({
  currentMonth,
  locale,
  fixedWeeks,
  color,
  variant,
  size,
  hideWeekdays,
  isDisabled,
  isSelected,
  isInSelectedRange,
  handleDateClick,
  slots,
  weekDays
}: SingleMonthCalendarProps) {
  const monthGrid = useMemo(() => {
    const weeks: DateValue[][] = [];
    const weeksInMonth = getWeeksInMonth(currentMonth, locale);
    const firstDayOfMonth = currentMonth.set({ day: 1 });

    let currentDate = startOfWeek(firstDayOfMonth, locale);

    for (let week = 0; week < (fixedWeeks ? 6 : weeksInMonth); week++) {
      const weekDates: DateValue[] = [];

      for (let day = 0; day < 7; day++) {
        weekDates.push(currentDate);
        currentDate = currentDate.add({ days: 1 });
      }

      weeks.push(weekDates);
    }

    return weeks;
  }, [currentMonth, locale, fixedWeeks]);

  const colors = colorVariants[color];
  const sizes = sizeConfig[size];

  return (
    <div>
      {/* Week day headers */}
      {!hideWeekdays && (
        <div className={`grid grid-cols-7 ${sizes.gap} mb-2`}>
          {weekDays.map((day: string, i: number) => (
            <div key={i} className={`text-center ${sizes.text} font-semibold text-gray-600 py-2`}>
              {slots?.weekDay ? slots.weekDay({ day }) : day}
            </div>
          ))}
        </div>
      )}

      {/* Date grid */}
      <div className="space-y-1">
        {monthGrid.map((week: DateValue[], weekIndex: number) => (
          <div key={weekIndex} className={`grid grid-cols-7 ${sizes.gap}`}>
            {week.map((date: DateValue, dateIndex: number) => {
              const isOutsideMonth = date.month !== currentMonth.month;
              const isSelectedDate = isSelected(date);
              const isInRangeDate = isInSelectedRange(date);
              const isDisabledDate = isDisabled(date);
              const isToday = isSameDay(date, new CalendarDate(
                new Date().getFullYear(),
                new Date().getMonth() + 1,
                new Date().getDate()
              ));

              return (
                <button
                  key={dateIndex}
                  onClick={() => !isDisabledDate && handleDateClick(date)}
                  disabled={isDisabledDate}
                  className={`
                    relative ${sizes.button} p-0 rounded-full transition-all duration-200
                    ${isOutsideMonth ? '!text-gray-300' : '!text-gray-900'}
                    ${isSelectedDate ? colors[variant] : ''}
                    ${isInRangeDate && !isSelectedDate ? colors.range : ''}
                    ${!isSelectedDate && !isDisabledDate && !isOutsideMonth ? 'hover:bg-gray-100' : ''}
                    ${isDisabledDate ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}
                    ${isToday && !isSelectedDate ? colors.today : ''}
                  `}
                >
                  {slots?.day ? slots.day({ day: date }) : date.day}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// Main Calendar Component
export const Calendar = forwardRef(function Calendar<R extends boolean = false, M extends boolean = false>({
  nextYearIcon,
  nextYear = {},
  nextMonthIcon,
  nextMonth = {},
  prevYearIcon,
  prevYear = {},
  prevMonthIcon,
  prevMonth = {},
  color = 'primary',
  variant = 'solid',
  size = 'md',
  range = false as R,
  multiple = false as M,
  monthControls = true,
  yearControls = true,
  fixedWeeks = true,
  defaultValue,
  value,
  onChange,
  className = '',
  locale = 'en-US',
  minValue,
  maxValue,
  isDateUnavailable,
  numberOfMonths = 1,
  hideWeekdays = false,
  slots = {},
}: CalendarProps<R, M>, ref: React.Ref<any>) {
  const [currentMonth, setCurrentMonth] = React.useState<DateValue>(() => {
    if (value) {
      if (range && value && typeof value === 'object' && 'start' in value) {
        return value.start;
      }
      if (multiple && Array.isArray(value) && value.length > 0) {
        return value[0];
      }
      if (value && typeof value === 'object' && 'year' in value) {
        return value as DateValue;
      }
    }
    if (defaultValue) {
      if (range && typeof defaultValue === 'object' && 'start' in defaultValue) {
        return defaultValue.start;
      }
      if (multiple && Array.isArray(defaultValue) && defaultValue.length > 0) {
        return defaultValue[0];
      }
      return defaultValue as DateValue;
    }
    return new CalendarDate(new Date().getFullYear(), new Date().getMonth() + 1, 1);
  });

  const [selectedDate, setSelectedDate] = React.useState<CalendarModelValue<R, M>>(
    value || defaultValue as CalendarModelValue<R, M>
  );

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedDate(value);
    }
  }, [value]);

  const weekDays = useMemo(() => getWeekDayNames(locale), [locale]);

  const months = useMemo(() => {
    const monthsArray: DateValue[] = [];
    for (let i = 0; i < numberOfMonths; i++) {
      monthsArray.push(currentMonth.add({ months: i }));
    }
    return monthsArray;
  }, [currentMonth, numberOfMonths]);

  const handleDateClick = (date: DateValue) => {
    let newValue: CalendarModelValue<R, M>;

    if (range) {
      const rangeValue = selectedDate as DateRange | null;

      if (!rangeValue || !rangeValue.start || (rangeValue.start && rangeValue.end)) {
        newValue = { start: date, end: null } as CalendarModelValue<R, M>;
      } else if (rangeValue.start && !rangeValue.end) {
        if (date.compare(rangeValue.start) < 0) {
          newValue = { start: date, end: rangeValue.start } as CalendarModelValue<R, M>;
        } else if (date.compare(rangeValue.start) === 0) {
          newValue = { start: date, end: null } as CalendarModelValue<R, M>;
        } else {
          newValue = { start: rangeValue.start, end: date } as CalendarModelValue<R, M>;
        }
      } else {
        newValue = { start: date, end: null } as CalendarModelValue<R, M>;
      }
    } else if (multiple) {
      const multiValue = (selectedDate || []) as DateValue[];
      const exists = multiValue.some(d => isSameDay(d, date));
      newValue = (exists
        ? multiValue.filter(d => !isSameDay(d, date))
        : [...multiValue, date]) as CalendarModelValue<R, M>;
    } else {
      newValue = date as CalendarModelValue<R, M>;
    }

    setSelectedDate(newValue);
    onChange?.(newValue);
  };

  const isSelected = (date: DateValue): boolean => {
    if (range) {
      const rangeValue = selectedDate as DateRange | null;
      return isSameDay(date, rangeValue?.start) || (rangeValue?.end ? isSameDay(date, rangeValue.end) : false);
    }
    if (multiple) {
      const multiValue = selectedDate as DateValue[] | undefined;
      return multiValue?.some(d => isSameDay(d, date)) || false;
    }
    return isSameDay(date, selectedDate as DateValue);
  };

  const isInSelectedRange = (date: DateValue): boolean => {
    if (!range) return false;
    const rangeValue = selectedDate as DateRange | null;
    if (!rangeValue || !rangeValue.start || !rangeValue.end) return false;
    return isInRange(date, rangeValue as DateRange & { end: DateValue });
  };

  const isDisabled = (date: DateValue): boolean => {
    if (minValue && date.compare(minValue) < 0) return true;
    if (maxValue && date.compare(maxValue) > 0) return true;
    if (isDateUnavailable?.(date)) return true;
    return false;
  };

  const prevMonthHandler = () => {
    setCurrentMonth(currentMonth.subtract({ months: 1 }));
  };

  const nextMonthHandler = () => {
    setCurrentMonth(currentMonth.add({ months: 1 }));
  };

  const prevYearHandler = () => {
    setCurrentMonth(currentMonth.subtract({ years: 1 }));
  };

  const nextYearHandler = () => {
    setCurrentMonth(currentMonth.add({ years: 1 }));
  };

  useImperativeHandle(ref, () => ({
    prevMonthHandler,
    nextMonthHandler,
    prevYearHandler,
    nextYearHandler
  }))

  const showYearControls = yearControls;

  // Generate title for all months
  const generateTitle = () => {
    const firstMonth = months[0];
    const lastMonth = months[months.length - 1];

    if (numberOfMonths === 1) {
      return getMonthName(firstMonth, locale);
    }

    const firstMonthName = new Date(firstMonth.year, firstMonth.month - 1).toLocaleDateString(locale, { month: 'long' });
    const lastMonthName = new Date(lastMonth.year, lastMonth.month - 1).toLocaleDateString(locale, { month: 'long' });

    // Check if same year
    if (firstMonth.year === lastMonth.year) {
      return `${firstMonthName} - ${lastMonthName} ${firstMonth.year}`;
    } else {
      return `${firstMonthName} ${firstMonth.year} - ${lastMonthName} ${lastMonth.year}`;
    }
  };

  const titleText = generateTitle();
  const sizes = sizeConfig[size];

  return (
    <div className={`inline-block ${sizes.padding} ${className} `}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1">
          {showYearControls && (
            <Button
              icon={prevYearIcon || <Icon icon="lucide:chevrons-left" className="w-4 h-4" />}
              onClick={prevYearHandler}
              aria-label="Previous year"
              {...prevYear}
            />
          )}
          {monthControls && (
            <Button
              icon={prevMonthIcon || <Icon icon="lucide:chevron-left" className="w-4 h-4" />}
              onClick={prevMonthHandler}
              aria-label="Previous month"
              {...prevMonth}
            />
          )}
        </div>

        <div className="flex-1 text-center font-bold text-lg !text-gray-900 dark:text-white">
          {slots.heading ? slots.heading({ value: titleText }) : titleText}
        </div>

        <div className="flex items-center gap-1">
          {monthControls && (
            <Button
              icon={nextMonthIcon || <Icon icon="lucide:chevron-right" className="w-4 h-4" />}
              onClick={nextMonthHandler}
              aria-label="Next month"
              {...nextMonth}
            />
          )}
          {showYearControls && (
            <Button
              icon={nextYearIcon || <Icon icon="lucide:chevrons-right" className="w-4 h-4" />}
              onClick={nextYearHandler}
              aria-label="Next year"
              {...nextYear}
            />
          )}
        </div>
      </div>

      {/* Calendar Grid(s) */}
      <div className={`grid gap-8 ${numberOfMonths > 1 ? `grid-cols-${Math.min(numberOfMonths, 3)}` : ''}`}
           style={{ gridTemplateColumns: numberOfMonths > 1 ? `repeat(${Math.min(numberOfMonths, 3)}, minmax(0, 1fr))` : undefined }}>
        {months.map((month, index) => (
          <div key={index}>
            {numberOfMonths > 1 && (
              <div className={`text-center font-medium mb-3 text-gray-700 ${sizes.text}`}>
                {new Date(month.year, month.month - 1).toLocaleDateString(locale, { month: 'long' })}
              </div>
            )}
            <SingleMonthCalendar
              currentMonth={month}
              locale={locale}
              fixedWeeks={fixedWeeks}
              color={color}
              variant={variant}
              size={size}
              hideWeekdays={hideWeekdays}
              isDisabled={isDisabled}
              isSelected={isSelected}
              isInSelectedRange={isInSelectedRange}
              handleDateClick={handleDateClick}
              slots={slots}
              weekDays={weekDays}
            />
          </div>
        ))}
      </div>
    </div>
  );
})
