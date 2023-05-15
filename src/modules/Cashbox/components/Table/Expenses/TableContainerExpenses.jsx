import { useContext, useEffect, useRef, useState } from "react";
import Cashbox from "../../../../../API/Cashbox";
import { SettingsContext } from "../../../../../context";
import TableCashbox from "../Table";
import TableRowCashboxExpenses from "./TableRowCashboxExpenses";
const theadCashboxExpenses = require('./thead.json');

const COUNT_PAGE_SIZE = 40

export default function TableContainerExpenses(props) {
  const settings = useContext(SettingsContext)
  const [page, setPage] = useState(1);
  const filterRef = useRef({})
  const lazyLoading = useRef(false)
  const countExpenses = useRef(false)

  const { filterCashbox, cashboxExpenses, setCashboxExpenses } = props;

  useEffect(() => {
      const expensesTypePayments = {type_payment_fk: settings.type_payment_fk_expenses_status};

      if (filterRef.current !== filterCashbox) {
        Cashbox.getCashbox({...filterCashbox, ...expensesTypePayments, page: 1, page_size: COUNT_PAGE_SIZE}, (data) => {
          countExpenses.current = data?.count
          lazyLoading.current = false
          setCashboxExpenses(data.results)
          setPage(1)
        })

        filterRef.current = filterCashbox
      } else if (cashboxExpenses.length < page * COUNT_PAGE_SIZE) { // защита от лишних запросов
        Cashbox.getCashbox({...filterCashbox, ...expensesTypePayments, page, page_size: COUNT_PAGE_SIZE}, (data) => {
          countExpenses.current = data?.count
          lazyLoading.current = false
          setCashboxExpenses(expenses => ([...expenses, ...data.results]))
        })
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCashbox, page])


  const handleScrollBottom= () => {
    if (!lazyLoading.current && countExpenses.current > cashboxExpenses.length) {
        lazyLoading.current = true;
        setPage(page => page+1)
    }
  }

  if (!cashboxExpenses.length) return <div>Нет данных</div>;

  return <TableCashbox
            rowComponent={TableRowCashboxExpenses}
            thead={theadCashboxExpenses.tableCashboxExpensesThead}
            tbody={cashboxExpenses}
            onScrollBottom={handleScrollBottom}
          />
}