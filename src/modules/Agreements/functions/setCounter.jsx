import stylesCounter from '../../../components/Counter/Counter.module.css'
import PaidIcon from '@mui/icons-material/Paid';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import PersonOffIcon from '@mui/icons-material/PersonOff';
import NetworkPingIcon from '@mui/icons-material/NetworkPing';
import { Libs } from '../../../Libs';


export const getCounterAgreements = (data) => {
  return [
    {
      hint: 'Заключено на суммму',
      count: Libs.getSpaceNumber(data?.money_all),
      icon: <PaidIcon className={stylesCounter.iconCounter} />,
      styles: { width: 330, height: 80, backgroundColor: '#66bb6a' },
    },
    {
      hint: 'Внесено',
      count: Libs.getSpaceNumber(data?.cashbox_all),
      icon: <CurrencyExchangeIcon className={stylesCounter.iconCounter} />,
      styles: { width: 330, height: 80, backgroundColor: '#1976d2' },
    },
    {
      hint: 'Расторжено договоров',
      count: Libs.getSpaceNumber(data?.dissolution_agreements),
      icon: <PersonOffIcon className={stylesCounter.iconCounter} />,
      styles: { width: 330, height: 80, backgroundColor: '#e74040' },
    },
    {
      hint: 'KPI за день',
      count: Libs.getSpaceNumber(0),
      chart: true,
      backgroundColor: '#ffb33d',
      icon: <NetworkPingIcon className={stylesCounter.iconCounter} />,
      styles: { width: 330, height: 80, backgroundColor: '#ffb33d' },
    },

  ]
}