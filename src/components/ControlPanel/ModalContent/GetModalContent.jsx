import AgreementsDetail from "../AgreementsDetail";
import CashboxDetail from "../CashboxDetail";
import ComingsDetail from "../ComingsDetail";

export function getModalContent(page, row, type = 'create') {
  let result = {}
  
  switch (page) {
    case 'comings':
      result['titleAdd'] = 'Добавить клиента'
      result['component'] = <ComingsDetail client={row} index={0} type={type} />
      result['titleSearch'] = 'Поиск по клиентам'
      break
    case 'agreements':
      result['titleAdd'] = 'Добавить клиента'
      result['component'] = <AgreementsDetail agreement={row} index={0} type={type}/>
      result['titleSearch'] = 'Поиск по договорам'
      break

    case 'cashbox':
      result['titleAdd'] = 'Добавить кассу'
      result['component'] = <CashboxDetail cashbox={row} index={0} />
      result['titleSearch'] = 'Поиск по кассе'
      break
    default: break
  }

  return result
}