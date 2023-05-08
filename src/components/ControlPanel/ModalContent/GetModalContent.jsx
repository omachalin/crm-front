import AgreementsDetail from "../AgreementsDetail";
import ComingsDetail from "../ComingsDetail";

export function getModalContent(page, row) {
  let result = {}
  
  switch (page) {
    case 'comings':
      result['titleAdd'] = 'Добавить клиента'
      result['component'] = <ComingsDetail client={row} index={0} />
      result['titleSearch'] = 'Поиск по клиентам'
      break
    case 'agreements':
      result['titleAdd'] = 'Добавить клиента'
      result['component'] = <AgreementsDetail agreement={row} index={0} />
      result['titleSearch'] = 'Поиск по договорам'
      break
    default: break
  }

  return result
}