import { useContext, useEffect, useRef, useState } from "react";
import Cashbox from "../../../../../API/Cashbox";
import { SettingsContext } from "../../../../../context";
import TableCashbox from "../Table";
import TableRowCashboxIncome from "./TableRowCashboxIncome";
const theadCashboxIncome = require('./thead.json');

const COUNT_PAGE_SIZE = 40

export default function TableContainerIncome(props) {
  const settings = useContext(SettingsContext)
  const [page, setPage] = useState(1);
  const filterRef = useRef({})
  const lazyLoading = useRef(false)
  const countIncome = useRef(false)

  const { filterCashbox, cashboxIncome, setCashboxIncome } = props;

  useEffect(() => {
      const incomeTypePayments = {type_payment_fk: [settings.type_payment_fk_agreement_status, settings.type_payment_fk_transport_status]};

      if (filterRef.current !== filterCashbox) {
        Cashbox.getCashbox({...filterCashbox, ...incomeTypePayments, page: 1, page_size: COUNT_PAGE_SIZE}, (data) => {
          countIncome.current = data?.count
          lazyLoading.current = false
          setCashboxIncome(data.results)
          setPage(1)
        })

        filterRef.current = filterCashbox
      } else if (cashboxIncome.length <= (page - 1) * COUNT_PAGE_SIZE) { // защита от повторной загрузки
        Cashbox.getCashbox({...filterCashbox, ...incomeTypePayments, page, page_size: COUNT_PAGE_SIZE}, (data) => {
          countIncome.current = data?.count
          lazyLoading.current = false
          setCashboxIncome(income => ([...income, ...data.results]))
        })
      }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCashbox, page])


  const handleScrollBottom= () => {
    if (!lazyLoading.current && countIncome.current > cashboxIncome.length) {
        lazyLoading.current = true;
        setPage(page => page+1)
    }
  }

  if (!cashboxIncome.length) return <div>Нет данных</div>;

  return <TableCashbox
            rowComponent={TableRowCashboxIncome}
            thead={theadCashboxIncome.tableCashboxIncomeThead}
            tbody={cashboxIncome}
            onScrollBottom={handleScrollBottom}
          />
}