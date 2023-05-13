import PaidIcon from '@mui/icons-material/Paid';
import { Libs } from '../../../Libs';
import stylesCounter from '../components/Counter/Counter.module.css'

export const getCounterCashbox = (data) => {
  return [
    {
      hint: 'Доход',
      count: data?.cashbox_today?.money,
      period: data?.cashbox__15_days?.money,
      month: data?.cashbox_month?.monay,
      cash: data?.cashbox_cash_today?.money,
      cashless: data?.cashbox_cashless_today?.money,
      styles: { width: 330, height: 80, backgroundColor: '#66bb6a' },
      icon: <PaidIcon className={stylesCounter.iconCounter} />,
    },
    {
      hint: 'Расход',
      count: data?.cashbox_expenses_today?.money,
      period: data?.cashbox_expenses__15_days?.money,
      month: data?.cashbox_expenses_month?.monay,
      cash: data?.cashbox_expenses_cash_today?.money,
      cashless: data?.cashbox_expenses_cashless_today?.money,
      styles: { width: 330, height: 80, backgroundColor: '#1976d2' },
      icon: <PaidIcon className={stylesCounter.iconCounter} />,
    },
    {
      hint: 'Итог',
      count: data?.profit_today?.money,
      period: data?.profit__15_days?.money,
      month: data?.profit_month?.monay,
      cash: data?.profit_cash_today?.money,
      cashless: data?.profit_cashless_today?.money,
      styles: { width: 330, height: 80, backgroundColor: '#e74040' },
      icon: <PaidIcon className={stylesCounter.iconCounter} />,
    },
    {
      hint: '',
      data: [
        {
          date: '17.02.2023',
          income: 4000,
          expenses: 1400,
        },{
          date: '17.03.2023',
          income: 1000,
          expenses: 2400,
        },{
          date: '17.04.2023',
          income: 4000,
          expenses: 1400,
        },{
          date: '17.05.2023',
          income: 3400,
          expenses: 2400,
        }
      ],
      chart: true,
      backgroundColor: '#ffb33d',
      styles: { width: 330, height: 80, backgroundColor: '#ffb33d' },
    },
  ]
}
