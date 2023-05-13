import PaidIcon from '@mui/icons-material/Paid';
import { Libs } from '../../../Libs';
import stylesCounter from '../components/Counter/Counter.module.css'

export const getCounterCashbox = (data) => {
  return [
    {
      hint: 'Доход',
      count: Libs.getSpaceNumber(data?.cashbox_today?.money),
      period: Libs.getSpaceNumber(data?.cashbox_15_days?.money),
      month: Libs.getSpaceNumber(data?.cashbox_month?.money),
      cash: Libs.getSpaceNumber(data?.cashbox_cash_today?.money),
      cashless: Libs.getSpaceNumber(data?.cashbox_cashless_today?.money),
      styles: { width: 330, height: 80, backgroundColor: '#66bb6a' },
      icon: <PaidIcon className={stylesCounter.iconCounter} />,
    },
    {
      hint: 'Расход',
      count: Libs.getSpaceNumber(data?.cashbox_expenses_today?.money),
      period: Libs.getSpaceNumber(data?.cashbox_expenses_15_days?.money),
      month: Libs.getSpaceNumber(data?.cashbox_expenses_month?.money),
      cash: Libs.getSpaceNumber(data?.cashbox_expenses_cash_today?.money),
      cashless: Libs.getSpaceNumber(data?.cashbox_expenses_cashless_today?.money),
      styles: { width: 330, height: 80, backgroundColor: '#1976d2' },
      icon: <PaidIcon className={stylesCounter.iconCounter} />,
    },
    {
      hint: 'Итог',
      count: Libs.getSpaceNumber(data?.profit_today?.money),
      period: Libs.getSpaceNumber(data?.profit__15_days?.money),
      month: Libs.getSpaceNumber(data?.profit_month?.money),
      cash: Libs.getSpaceNumber(data?.profit_cash_today?.money),
      cashless: Libs.getSpaceNumber(data?.profit_cashless_today?.money),
      styles: { width: 330, height: 80, backgroundColor: '#e74040' },
      icon: <PaidIcon className={stylesCounter.iconCounter} />,
    },
    {
      hint: '',
      data: data?.graph,
      chart: true,
      styles: { width: 330, height: 80, backgroundColor: '#ffffff' },
    },
  ]
}
