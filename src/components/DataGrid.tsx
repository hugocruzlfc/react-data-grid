import React from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";

import NumberFilter from "@inovua/reactdatagrid-community/NumberFilter";
import SelectFilter from "@inovua/reactdatagrid-community/SelectFilter";
import DateFilter from "@inovua/reactdatagrid-community/DateFilter";

import moment from "moment";

interface Person {
  id: number;
  name: string;
  age: number;
  country: string;
  city: string;
  birthDate: string;
}

const flags: { [key: string]: string } = {
  ca: "🇨🇦",
  uk: "🇬🇧",
  usa: "🇺🇸",
};

const people: Person[] = [
  {
    id: 1,
    name: "John McQueen",
    age: 35,
    country: "ca",
    city: "Toronto",
    birthDate: "1984-06-10",
  },
  {
    id: 2,
    name: "Mary Stones",
    age: 25,
    country: "ca",
    city: "Vancouver",
    birthDate: "1994-06-10",
  },
  {
    id: 3,
    name: "Robert Fil",
    age: 27,
    country: "usa",
    city: "New York",
    birthDate: "1992-06-10",
  },
  {
    id: 4,
    name: "Roger Robson",
    age: 81,
    country: "usa",
    city: "Los Angeles",
    birthDate: "1938-06-10",
  },
  {
    id: 5,
    name: "Billary Konwik",
    age: 18,
    country: "uk",
    city: "London",
    birthDate: "2001-06-10",
  },
  {
    id: 6,
    name: "Bob Martin",
    age: 18,
    country: "uk",
    city: "London",
    birthDate: "2001-06-10",
  },
  {
    id: 7,
    name: "Matthew Richardson",
    age: 54,
    country: "usa",
    city: "Los Angeles",
    birthDate: "1965-06-10",
  },
  {
    id: 8,
    name: "Ritchie Peterson",
    age: 54,
    country: "usa",
    city: "Los Angeles",
    birthDate: "1965-06-10",
  },
  {
    id: 9,
    name: "Bryan Martin",
    age: 40,
    country: "usa",
    city: "New York",
    birthDate: "1979-06-10",
  },
  {
    id: 10,
    name: "Mark Martin",
    age: 44,
    country: "usa",
    city: "New York",
    birthDate: "1975-06-10",
  },
  {
    id: 11,
    name: "Michelle Sebastian",
    age: 24,
    country: "ca",
    city: "Toronto",
    birthDate: "1995-06-10",
  },
];

const COUNTRIES: { [key: string]: string } = {
  ca: "Canada",
  uk: "United Kingdom",
  usa: "United States of America",
};

const filterValue = [
  { name: "name", operator: "startsWith", type: "string", value: "" },
  { name: "age", operator: "gte", type: "number", value: null },
  { name: "city", operator: "startsWith", type: "string", value: "" },
  {
    name: "birthDate",
    operator: "before",
    type: "date",
    value: "",
  },
  { name: "country", operator: "eq", type: "select", value: null },
];

const columns = [
  {
    name: "id",
    header: "Id",
    defaultVisible: false,
    defaultWidth: 80,
    type: "number",
  },
  { name: "name", header: "Name", defaultFlex: 1 },
  {
    name: "age",
    header: "Age",
    defaultFlex: 1,
    type: "number",
    filterEditor: NumberFilter,
  },
  {
    name: "country",
    header: "Country",
    defaultFlex: 1,
    filterEditor: SelectFilter,
    filterEditorProps: {
      placeholder: "All",
      dataSource: Object.keys(COUNTRIES).map((key) => ({
        id: key,
        label: COUNTRIES[key] || key,
      })),
    },
    render: ({ value }: { value: string }) =>
      flags[value] ? flags[value] : value,
  },
  {
    name: "birthDate",
    header: "Birth date",
    defaultFlex: 1,
    minWidth: 200,
    filterEditor: DateFilter,
    filterEditorProps: (props: any, { index }: { index: number }) => {
      // for range and notinrange operators, the index is 1 for the after field
      return {
        dateFormat: "MM-DD-YYYY",
        cancelButton: false,
        highlightWeekends: false,
        placeholder:
          index === 1
            ? "Created date is before..."
            : "Created date is after...",
      };
    },
    render: ({ value, cellProps }: { value: string; cellProps: any }) => {
      return moment(value).format("MM-DD-YYYY");
    },
  },
  { name: "city", header: "City", defaultFlex: 1 },
];

const gridStyle = { minHeight: 600 };

export const DataGrid: React.FC = () => {
  return (
    <div>
      <ReactDataGrid
        idProperty="id"
        columns={columns}
        dataSource={people}
        style={gridStyle}
        defaultFilterValue={filterValue}
        pagination="local"
        // showColumnMenuTool={true}
      />
      <p>
        Delete the filters if you want to show all data. You can click the
        configure icon and then "Clear All"
      </p>
    </div>
  );
};
