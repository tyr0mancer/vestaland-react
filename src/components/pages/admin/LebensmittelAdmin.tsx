import React, {useState} from "react";
import {
  Button,
  CircularProgress,
  Grid,
  TextField
} from "@mui/material";
import {QueryClient, useQuery} from "@tanstack/react-query";
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {Lebensmittel} from "../../../shared-types/model/Lebensmittel";
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {LebensmittelNeuForm} from "../../common/form-elements/specific/LebensmittelNeuForm";
import {AddOptionDialog} from "../../common/form-elements/specific/_AddOptionDialog";
import {apiClient} from "../../../util/api/apiClient";
import {APIService} from "../../../util/api/APIService";


/**
 * TS Doc Info
 * @component LebensmittelAdmin
 */
export function LebensmittelAdmin(): React.ReactElement {
  const [lebensmittelEdit, setLebensmittelEdit] = useState<Lebensmittel>(new Lebensmittel())
  const [search, setSearch] = useState<string>('')
  const [openModal, setOpenModal] = useState<boolean>(false)

  const {data, isFetching, refetch} = useQuery(
    {
      queryKey: ["lebensmittel-suche", search],
      queryFn: () => APIService.search<Lebensmittel>('lebensmittel', {name: search}),
      enabled: search.length > 1
    });

  const [selectionModel, setSelectionModel] = React.useState<any>([]);

  const handleDelete = () => {
    APIService.deleteMany('lebensmittel', selectionModel as string[])
      .then(() => queryClient.invalidateQueries({queryKey: ["rezepte-suche"]}))
      .then(() => refetch())
  };

  const handleNew = () => {
    setLebensmittelEdit(new Lebensmittel())
    setOpenModal(true)
  }

  const handleEdit = (lebensmittel: Lebensmittel) => {
    setLebensmittelEdit(lebensmittel)
    setOpenModal(true)
  }

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
      description: 'Kurzer Name, wie er in der Zusammenfassung auch auftaucht. Beispiel: Mehl'
    },
    {
      field: 'nameDetail',
      headerName: 'Detaillierter Name',
      width: 150,
      description: 'Eine genauere Beschreibung. Beispiel: Weizenmehl 405'
    },
    {
      field: 'defaultMenge',
      headerName: 'Menge',
      type: 'number',
      width: 70,
      description: 'Eine übliche Menge. Wird als Standard-Wert gesetzt, wenn dieses Lebensmittel ausgewählt wird.'
    },
    {
      field: 'defaultEinheit',
      headerName: 'Einheit',
      width: 100,
      description: 'Diese Einheit wird als Default-Wert gesetzt.'
    },
    {
      field: 'nutrients.kalorien',
      headerName: 'Kalorien',
      type: 'number',
      valueGetter: (params) => params.row.nutrients?.kalorien || null,
      width: 80
    },
    {
      field: 'nutrients.proteine',
      headerName: 'Proteine',
      type: 'number',
      valueGetter: (params) => params.row.nutrients?.proteine || null,
      width: 80
    },
    {
      field: 'nutrients.fett',
      headerName: 'Fett',
      type: 'number',
      valueGetter: (params) => params.row.nutrients?.fett || null,
      width: 80,
    },
    {
      field: 'nutrients.kohlenhydrate',
      headerName: 'Carbs',
      type: 'number',
      valueGetter: (params) => params.row.nutrients?.kohlenhydrate || null,
      width: 80,
    },
    {
      field: 'nutrients.zucker',
      headerName: 'Zucker',
      type: 'number',
      valueGetter: (params) => params.row.nutrients?.zucker || null,
      width: 80,
    },
    {
      field: 'nutrients.ballaststoffe',
      headerName: 'Ballaststoffe',
      type: 'number',
      valueGetter: (params) => params.row.nutrients?.ballaststoffe || null,
      width: 80,
    },
    {
      field: 'actions',
      headerName: '',
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <IconButton size="medium" color="primary"
                    onClick={() => handleEdit(params.row)}
                    aria-label="Lebensmittel bearbeiten"
        ><EditIcon/></IconButton>
      )
    },
  ];

  const queryClient = new QueryClient();
  const handleChange = (value: Lebensmittel) => {
    if (!value._id)
      return apiClient.post(`/lebensmittel/`, value).then(async (res) => {
        await queryClient.invalidateQueries({queryKey: ["rezepte-suche"]})
        await refetch()
        return res.data
      })
    else
      return apiClient.put(`/lebensmittel/${value._id}`, value).then(async (res) => {
        await queryClient.invalidateQueries({queryKey: ["rezepte-suche"]})
        await refetch()
        return res.data
      })
  }

  return (<>
    <Grid container spacing={2} alignItems="center">
      <Grid item>
        <Button variant="contained" color="primary" onClick={() => handleNew()}>Neu</Button>
      </Grid>
      <Grid item xs>
        <TextField
          value={search}
          label="Lebensmittel"
          fullWidth
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <React.Fragment>
                {isFetching ? <CircularProgress color="inherit" size={20}/> : null}
              </React.Fragment>
            ),
          }}
        />
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" onClick={() => refetch()}>Suchen</Button>
      </Grid>
    </Grid>

    <DataGrid
      getRowId={(row => row._id)}
      rows={data || []}
      columns={columns}
      disableColumnFilter={true}
      initialState={{
        pagination: {
          paginationModel: {page: 0, pageSize: 5},
        },
      }}
      pageSizeOptions={[5, 10]}
      checkboxSelection
      rowSelectionModel={selectionModel}
      onRowSelectionModelChange={(newSelection) => {
        setSelectionModel(newSelection);
      }}
    />


    <AddOptionDialog<Lebensmittel>
      title={'Neues Lebensmittel in DB anlegen'}
      mutationFn={handleChange}
      open={openModal} handleClose={() => setOpenModal(false)}
      initialValues={lebensmittelEdit}
    >
      <LebensmittelNeuForm open={openModal}/>
    </AddOptionDialog>


    <IconButton size="small" color="warning"
                onClick={handleDelete}
                aria-label="Lebensmittel löschen"
    ><DeleteIcon/> Lebensmittel löschen</IconButton>

  </>)
}
