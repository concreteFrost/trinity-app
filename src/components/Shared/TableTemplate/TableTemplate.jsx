import { useTable, usePagination, useSortBy } from "react-table";
import s from "./TableTemplate.module.scss";

export const TableTemplate = ({ columns, data, hiddenColumn }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    pageOptions,
    state,
    gotoPage,
    pageCount,
    setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState:{
        hiddenColumns:[hiddenColumn]
      }
    },
    useSortBy,
    usePagination
  );

  const { pageIndex, pageSize } = state;
  return (
    <div className={s.wrapper}>
      <table className={s.table_template} {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render("Header")}
                 
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.length > 0 ? (
            page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={headerGroups[0].headers.length + 1}>
                Nothing to show
              </td>
            </tr>
          )}
        </tbody>
        {pageCount > 0 ? (
          <tfoot className={s.footer}>
            <tr>
            <td colSpan={headerGroups[0].headers.length + 1}>
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  {"<<"}
                </button>{" "}
                <button
                  onClick={() => previousPage()}
                  disabled={!canPreviousPage}
                >
                  Previous
                </button>{" "}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                  Next
                </button>{" "}
                <button
                  onClick={() => gotoPage(pageCount - 1)}
                  disabled={!canNextPage}
                >
                  {">>"}
                </button>{" "}
                <span>
                  Page <strong>{pageIndex + 1}</strong> of{" "}
                  <strong>{pageOptions.length}</strong>{" "}
                </span>
                <span>
                  | Go to page:{" "}
                  <input
                    type="number"
                    defaultValue={pageIndex + 1}
                    onChange={(e) => {
                      const pageNumber = e.target.value
                        ? Number(e.target.value) - 1
                        : 0;
                      gotoPage(pageNumber);
                    }}
                    style={{ width: "50px" }}
                  />
                </span>{" "}
                <select
                  value={pageSize}
                  onChange={(e) => setPageSize(Number(e.target.value))}
                >
                  {[10, 25, 50].map((pageSize) => (
                    <option key={pageSize} value={pageSize}>
                      Show {pageSize}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
          </tfoot>
        ) : null}
      </table>
    </div>
  );
};
