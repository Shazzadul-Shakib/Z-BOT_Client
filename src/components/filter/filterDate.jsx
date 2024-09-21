import { useForm } from "react-hook-form";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";

// Utility function to generate years dynamically (e.g., from 2000 to the current year)
const generateYears = (startYear) => {
  const currentYear = new Date().getFullYear();
  let years = [];
  for (let year = currentYear; year >= startYear; year--) {
    years.push(year);
  }
  return years;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const FilterDropdown = () => {
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const years = generateYears(2000); // Generate years dynamically

  // Handle form submission
  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Month Dropdown */}
      <div className="flex flex-col">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-4 py-2 bg-gray-200 rounded-md">
              {errors.month ? "Select Month" : "Select Month"}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white rounded-md shadow-lg">
            {months.map((month) => (
              <DropdownMenuItem
                key={month}
                onClick={() =>
                  setValue("month", month, { shouldValidate: true })
                }
                className="px-4 py-2 hover:bg-gray-100"
              >
                {month}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {errors.month && (
          <span className="text-red-500">Please select a month</span>
        )}
      </div>

      {/* Year Dropdown */}
      <div className="flex flex-col">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="px-4 py-2 bg-gray-200 rounded-md">
              {errors.year ? "Select Year" : "Select Year"}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white rounded-md shadow-lg">
            {years.map((year) => (
              <DropdownMenuItem
                key={year}
                onClick={() => setValue("year", year, { shouldValidate: true })}
                className="px-4 py-2 hover:bg-gray-100"
              >
                {year}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {errors.year && (
          <span className="text-red-500">Please select a year</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded-md"
      >
        Submit
      </button>
    </form>
  );
};

export default FilterDropdown;
