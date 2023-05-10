import { Button, Grid } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SearchIcon from '@mui/icons-material/Search';
import styles from './ControlPanel.module.css'
import { useState } from 'react';
import ResponsiveDialog from '../Modal/Modal';
import { getModalContent } from './ModalContent/GetModalContent';


function ControlPanel(props) {
  const [modalStatus, setModalStatus] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState();
  const [modalButtons, setModalButtons] = useState();


  const create = () => {
    let newClient = { id: 0 }
    let modalContent = getModalContent(props.component, newClient, 'create')
    setModalTitle(modalContent['titleAdd'])
    setModalContent(
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          {modalContent['component']}
        </Grid>
      </Grid>
    )

    setModalButtons(
      <>
        <Button onClick={(e) => { setModalStatus(false); }}>Закрыть</Button>
        <Button autoFocus onClick={(e) => {
          delete newClient.id
          props.create(newClient)
          setModalStatus(false)
        }}>Добавить</Button>
      </>
    )

    setModalStatus(true)
  }

  const search = () => {
    let client = { id: 0 }
    let modalContent = getModalContent(props.component, client, 'search')
    setModalTitle(modalContent['titleSearch'])
    setModalContent(
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12}>
          {modalContent['component']}
        </Grid>
      </Grid>
    )

    setModalButtons(
      <>
        <Button onClick={(e) => { setModalStatus(false); }}>Закрыть</Button>
        <Button autoFocus onClick={(e) => {
          delete client.id
          props.search(client)
          setModalStatus(false)
        }}>Поиск</Button>
      </>
    )

    setModalStatus(true)
  }


  return (
    <div className={styles.controlPanel}>
      <ResponsiveDialog
        title={modalTitle}
        content={modalContent}
        buttons={modalButtons}
        status={modalStatus}
        setModalStatus={setModalStatus}
      />
      <Grid container sx={{ marginTop: '1%' }} alignItems="right">
        <Grid item xs>
          {props.create &&
            <AddCircleIcon
              className={styles.addIcon}
              onClick={create}
            />
          }
          <SearchIcon
            className={styles.searchIcon}
            onClick={search}
          />

        </Grid>
      </Grid>
    </div>
  );
}

export default ControlPanel;
