const tableResults = {
  columns: [
    {
      label: 'Cnan',
      name: 'CNAN',
    },
    {
      label: 'Fecha',
      name: 'FECHA',
    },
    {
      label: 'Cod_Adu',
      name: 'CADUANA',
      options: {
        customBodyRender: (value) => <div style={{ textAlign: 'center' }}>{value}</div>,
      },
    },
    {
      label: 'Cif_($)',
      name: 'CIF_DOLAR',
      options: {
        customBodyRender: (value) => <div style={{ textAlign: 'right' }}>{value}</div>,
      },
    },
    {
      label: 'Ctd',
      name: 'UNID_FIQTY',
      options: {
        customBodyRender: (value) => <div style={{ textAlign: 'center' }}>{value}</div>,
      },
    },
    {
      label: 'Und',
      name: 'UNID_FIDES',
      options: {
        customBodyRender: (value) => <div style={{ textAlign: 'center' }}>{value}</div>,
      },
    },
    {
      label: 'Desc_Com',
      name: 'DESC_COM',
      options: {
        customBodyRender: (value) => (
          <div
            style={{
              maxWidth: '200px',
              maxHeight: '25px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {value}
          </div>
        ),
      },
    },
    {
      label: 'Nun_Cor',
      name: 'NUME_CORRE',
      options: {
        customBodyRender: (value) => <div style={{ textAlign: 'center' }}>{value}</div>,
      },
    },
    {
      label: 'Estado',
      name: 'SEST_DESC',
      options: {
        customBodyRender: (value) => (
          <div
            style={{
              maxWidth: '200px',
              maxHeight: '25px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {value}
          </div>
        ),
      },
    },
    {
      label: 'RUC_IMP',
      name: 'LIBR_TRIBU',
    },
    {
      label: 'Raz_Soc',
      name: 'IMPORTADOR',
      options: {
        customBodyRender: (value) => (
          <div
            style={{
              maxWidth: '200px',
              maxHeight: '25px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {value}
          </div>
        ),
      },
    },
    {
      label: 'País',
      name: 'DPAIS_PROC',
    },
  ],
  options: {
    filterType: 'checkbox',
    rowsPerPageOptions: [3],
    rowsPerPage: 4,
    print: false,
    filter: false,
    selectableRows: 'none',
    responsive: false,
  },
}

export default tableResults
