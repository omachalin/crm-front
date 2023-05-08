import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReplayCircleFilledIcon from '@mui/icons-material/ReplayCircleFilled';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import stylesCounter from '../../../components/Counter/Counter.module.css'

export const getCounterComings = (data) => {
  return [
    {
      hint: 'Первичные приходы',
      count: data['first'],
      icon: <AccountCircleIcon className={stylesCounter.iconCounter} />,
      styles: { width: 280, height: 80, backgroundColor: '#1976d2' },
    },
    {
      hint: 'Вторичные приходы',
      count: data['second'],
      icon: <ReplayCircleFilledIcon className={stylesCounter.iconCounter} />,
      styles: { width: 280, height: 80, backgroundColor: '#585859' },
    },
    {
      hint: 'Договоры',
      count: data['agreement'],
      icon: <LibraryBooksIcon className={stylesCounter.iconCounter} />,
      styles: { width: 280, height: 80, backgroundColor: '#66bb6a' },
    },
    {
      hint: 'БК',
      count: data['bk'],
      icon: <RecordVoiceOverIcon className={stylesCounter.iconCounter} />,
      styles: { width: 280, height: 80, backgroundColor: '#ffb33d' },
    },

    {
      hint: 'Брак',
      count: data['reject'],
      icon: <NoAccountsIcon className={stylesCounter.iconCounter} />,
      styles: { width: 280, height: 80, backgroundColor: '#ef5350' },
    },

  ]
}