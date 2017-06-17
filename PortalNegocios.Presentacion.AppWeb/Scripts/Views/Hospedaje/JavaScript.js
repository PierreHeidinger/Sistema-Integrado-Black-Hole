$(document).ready(function () {
    var asesores = new Array();
    var pantalla = new ClassPantalla();



    function ClassEstadoPantalla() {
        this.ReadOnly = 0;
        this.Editable = 1;
    }

    function ClassPerfilUsuario() {
        this.FuerzaVenta = 0;
        this.JefeGrupoVenta = 1;
        this.Administrativo = 2;
    }

    function ClassAsesor() {
        this.NombreIntermediario = "";
        this.CodigoIntermediario = 0;
        this.CodigoUsuario = "";
        this.PerfilUsuario = "";
    }

    function ClassPantalla() {
        var base = this;
        var estadoPantalla = new ClassEstadoPantalla();
        var perfilUsuario = new ClassPerfilUsuario();

        this.solicitudOriginal = new ClassSolicitud();
        this.estado = estadoPantalla.ReadOnly;
        this.perfilUsuario = perfilUsuario.FuerzaVenta;
        this._self = $('#nuevaSolicitud');
        this.txtNumeroSolicitud = $('#txtNumeroSolicitud');
        this.txtNumeroGrupo = $('#txtNumeroGrupo');
        this.txtCUSPP = $('#txtCUSPP');
        this.cmbTipoMonedaPrima = $('#cmbTipoMonedaPrima');
        this.txtMontoPrima = $('#txtMontoPrima');
        this.txtAsegurado = $('#txtAsegurado');
        this.cmbTipoDocumento = $('#cmbTipoDocumento');
        this.txtNumeroDocumento = $('#txtNumeroDocumento');
        this.txtFechaDevenge = $('#txtFechaDevenge');
        this.datepickerFechaDevenge = $('#datepickerFechaDevenge');
        this.txtFechaCotizacion = $('#txtFechaCotizacion');
        this.datepickerFechaCotizacion = $('#datepickerFechaCotizacion');
        this.cmbModalidad = $('#cmbModalidad');
        this.cmbAsesor = $('#cmbAsesor');
        this.txtFechaTipoCambio = $('#txtFechaTipoCambio');
        this.datepickerFechaTipoCambio = $('#datepickerFechaTipoCambio');
        this.txtTipoCambio = $('#txtTipoCambio');
        this.btnGrabar = $('#btnGrabar');
        this.btnCotizar = $('#btnCotizar');
        this.NumeroModalidadesMaxima = 99;
        this.txtEstado = "";  //HND(PBH) P02190 DS-06518 2017/05/15 
        this.tabBeneficiarios = {
            _self: $('#beneficiarios'),
            _link: $('a[href="#beneficiarios"]'),
            grdBeneficiarios: $('#grdBeneficiarios'),
            cmbParentescoBenficiario: $('#cmbParentescoBenficiario'),
            txtPorcentajeBeneficiario: $('#txtPorcentajeBeneficiario'),
            cmbTipoDocumentoBeneficiario: $('#cmbTipoDocumentoBeneficiario'),
            txtNumeroDocumentoBeneficiario: $('#txtNumeroDocumentoBeneficiario'),
            cmbSexoBeneficiario: $('#cmbSexoBeneficiario'),
            txtDatepickerFechaNacimientoBeneficiario: $('#txtDatepickerFechaNacimientoBeneficiario'),
            datepickerFechaNacimientoBeneficiario: $('#datepickerFechaNacimientoBeneficiario'),
            cmbCondicionBeneficiario: $('#cmbCondicionBeneficiario'),
            cmbInvalidoPVBeneficiario: $('#cmbInvalidoPVBeneficiario'),
            btnAgregarBeneficiario: $('#btnAgregarBeneficiario'),
            btnEliminarBeneficiario: $('#btnEliminarBeneficiario'),
            ObtnerModelo: function () {
                var beneficiario = new ClassBeneficiario();
                beneficiario.CodigoParentesco = base.tabBeneficiarios.cmbParentescoBenficiario.find('option:selected').val();
                beneficiario.DescripcionParentesco = base.tabBeneficiarios.cmbParentescoBenficiario.find('option:selected').text();
                beneficiario.TipoDocumento = base.tabBeneficiarios.cmbTipoDocumentoBeneficiario.find('option:selected').val();
                beneficiario.NumeroDocumento = base.tabBeneficiarios.txtNumeroDocumentoBeneficiario.val();
                beneficiario.NumeroGrupo = base.txtNumeroGrupo.val();
                beneficiario.CodigoSexo = base.tabBeneficiarios.cmbSexoBeneficiario.find('option:selected').val();
                beneficiario.DescripcionSexo = base.tabBeneficiarios.cmbSexoBeneficiario.find('option:selected').text();
                beneficiario.CodigoCondicion = base.tabBeneficiarios.cmbCondicionBeneficiario.find('option:selected').val();
                beneficiario.DescripcionCondicion = base.tabBeneficiarios.cmbCondicionBeneficiario.find('option:selected').text();
                beneficiario.CodigoInvalidoPV = base.tabBeneficiarios.cmbInvalidoPVBeneficiario.find('option:selected').val();
                beneficiario.DescripcionInvalidoPV = base.tabBeneficiarios.cmbInvalidoPVBeneficiario.find('option:selected').text();
                beneficiario.FechaNacimiento = base.tabBeneficiarios.datepickerFechaNacimientoBeneficiario.datepicker('getDate');
                beneficiario.FechaNacimiento = (beneficiario.FechaNacimiento != null && beneficiario.FechaNacimiento != undefined) ? beneficiario.FechaNacimiento.toISOString() : null;
                beneficiario.Porcentaje = base.tabBeneficiarios.txtPorcentajeBeneficiario.val();

                return beneficiario
            },
            eventos: {
                Init: function () {
                    base.tabBeneficiarios.eventos.grdBeneficiariosInit();
                    base.tabBeneficiarios.eventos.cmbParentescoBenficiarioInit();
                    base.tabBeneficiarios.eventos.txtPorcentajeBeneficiarioInit();
                    base.tabBeneficiarios.eventos.cmbSexoBeneficiarioInit();
                    base.tabBeneficiarios.eventos.datepickerFechaNacimientoBeneficiarioInit();
                    base.tabBeneficiarios.eventos.cmbCondicionBeneficiarioInit();

                },
                cmbParentescoBenficiarioInit: function () {
                    base.tabBeneficiarios.cmbParentescoBenficiario.val('0');
                    base.tabBeneficiarios.cmbParentescoBenficiario.prop('disabled', true);
                },
                txtPorcentajeBeneficiarioInit: function () {
                    base.tabBeneficiarios.txtPorcentajeBeneficiario.val(100);
                    base.tabBeneficiarios.txtPorcentajeBeneficiario.prop('disabled', true);
                },
                cmbSexoBeneficiarioInit: function () {
                    base.tabBeneficiarios.cmbSexoBeneficiario.val('M');
                },
                datepickerFechaNacimientoBeneficiarioInit: function () {
                    base.tabBeneficiarios.datepickerFechaNacimientoBeneficiario.datepicker({ format: "dd/mm/yyyy", autoclose: true, language: "es", startDate: "01/01/1900" });
                    base.tabBeneficiarios.datepickerFechaNacimientoBeneficiario.datepicker('setDate', new Date());
                },
                cmbCondicionBeneficiarioInit: function () {
                    base.tabBeneficiarios.cmbCondicionBeneficiario.val('S');
                },
                cmbInvalidoPVBeneficiario: function () {
                    base.tabBeneficiarios.cmbInvalidoPVBeneficiario.val('N');
                },
                grdBeneficiariosInit: function () {
                    base.tabBeneficiarios.grdBeneficiarios.jqGrid({
                        datatype: "local",
                        colNames: [
                            'Codigo', //CodigoBeneficiario
                            'CodigoParentesco',//CodigoParentesco
                            'Parentesco', //DescripcionParentesco
                            '% Beneficio', //Porcentaje
                            'Tipo Documento', //TipoDocumento
                            'Nro Documento', //NumeroDocumento
                            'Nro Grupo', //NumeroGrupo
                            'CodigoSexo',//CodigoSexo
                            'Sexo', //DescripcionSexo
                            'Fec. Nacimiento', //FechaNacimiento
                            'CodigoCondicion', //CodigoCondicion
                            'Condición', //DescripcionCondicion
                            'CodigoInvalidoPV',//CodigoInvalidoPV
                            'Inválido PV'//DescripcionInvalidoPV
                        ],
                        colModel: [
                            { name: 'CodigoBeneficiario', index: 'CodigoBeneficiario', width: 60, sortable: false, hidden: true },
                            { name: 'CodigoParentesco', index: 'CodigoParentesco', hidden: true },
                            { name: 'DescripcionParentesco', index: 'DescripcionParentesco', width: 110, sortable: false },
                            { name: 'Porcentaje', index: 'Porcentaje', width: 110, sortable: false },
                            { name: 'TipoDocumento', index: 'TipoDocumento', width: 110, sortable: false, hidden: true },
                            { name: 'NumeroDocumento', index: 'NumeroDocumento', width: 110, sortable: false, hidden: true },
                            { name: 'NumeroGrupo', index: 'NumeroGrupo', width: 110, sortable: false, hidden: true },
                            { name: 'CodigoSexo', index: 'CodigoSexo', hidden: true },
                            { name: 'DescripcionSexo', index: 'DescripcionSexo', width: 110, sortable: false },
                            { name: 'FechaNacimiento', index: 'FechaNacimiento', width: 110, sortable: false, formatter: 'date', formatoptions: { newformat: 'd/m/Y' } },
                            { name: 'CodigoCondicion', index: 'CodigoCondicion', hidden: true },
                            { name: 'DescripcionCondicion', index: 'DescripcionCondicion', width: 110, sortable: false },
                            { name: 'CodigoInvalidoPV', index: 'CodigoInvalidoPV', hidden: true },
                            { name: 'DescripcionInvalidoPV', index: 'DescripcionInvalidoPV', width: 110, sortable: false }
                        ],
                        onClickRow: function (index, row) {
                            var rowColumn = row['CodigoBeneficiario'];
                            $("#hdCodigo").val(rowColumn);
                        },
                        rowNum: 5,
                        height: 110,
                        width: 920,
                        viewrecords: true,
                        caption: ""
                    });
                },
                btnAgregarBeneficiarioOnClick: function () {
                    var beneficiario = base.tabBeneficiarios.ObtnerModelo();


                    base.tabBeneficiarios.btnAgregarBeneficiario.prop("disabled", true);
                    if (base.tabBeneficiarios.Validaciones.ValidarBeneficiario(beneficiario)) {
                        base.tabBeneficiarios.grdBeneficiarios.addRowData(base.Helpers.guid(), beneficiario);
                    }
                    base.tabBeneficiarios.btnAgregarBeneficiario.prop("disabled", false);

                },
                btnEliminarBeneficiarioOnClick: function () {
                    var codigoBeneficiario;
                    var rowId = base.tabBeneficiarios.grdBeneficiarios.jqGrid('getGridParam', 'selrow');
                    if (rowId) {
                        var ret = base.tabBeneficiarios.grdBeneficiarios.jqGrid('getRowData', rowId);
                        base.tabBeneficiarios.grdBeneficiarios.delRowData(rowId)
                    } else {
                        base.frmMensaje.eventos.MostrarMensaje(0, 'Beneficiarios', '<ul><li>Selecciona una fila</li><ul>');
                    }
                }
            },
            Validaciones: {
                ExisteBeneficiarioTitular: function () {
                    var grid = base.tabBeneficiarios.grdBeneficiarios;
                    var rowIds = grid.getDataIDs();
                    var rowIdTitular = null;
                    for (var i = 0; i < rowIds.length; i++) {
                        var rowData = grid.getRowData(rowIds[i]);
                        if (rowData['CodigoParentesco'] == '0') {
                            rowIdTitular = rowIds[i];
                            break;
                        }
                    }

                    return rowIdTitular;
                },
                ValidarBeneficiario: function (beneficiario) {

                    var validacionesOK = true;
                    var excepciones = ['CodigoBeneficiario', 'NumeroDocumento', 'NumeroGrupo']
                    var mensaje = '<ul>';

                    if (beneficiario.CodigoParentesco == '0') {
                        if (base.tabBeneficiarios.Validaciones.ExisteBeneficiarioTitular() != null) {
                            validacionesOK = false;
                            mensaje += '<li>Solo puede exsistir un beneficiario titular</li>';
                        }
                    }

                    if (base.Helpers.tieneValoresVacios(beneficiario, excepciones).length > 0) {
                        validacionesOK = false;
                        mensaje += '<li>Todos los campos son obligatorios</li>';
                    }

                    mensaje += '</ul>';
                    if (!validacionesOK) {
                        base.frmMensaje.eventos.MostrarMensaje(0, 'Beneficiarios', mensaje);
                    }
                    return validacionesOK;
                }
            }
        };
        this.tabModalidades = {
            _self: $('#modalidades'),
            _link: $('a[href="#modalidades"]'),
            grdModalidades: $('#grdModalidades'),
            cmbProductoModalidad: $('#cmbProductoModalidad'),
            chkPeriodoGarantizadoModalidad: $('#chkPeriodoGarantizadoModalidad'),
            cmbPeriodoGarantizadoModalidad: $('#cmbPeriodoGarantizadoModalidad'),
            cmbTipoMonedaModalidad: $('#cmbTipoMonedaModalidad'),
            chkDevolucionPrimaModalidad: $('#chkDevolucionPrimaModalidad'),
            lblDevolucionPrimaModalidad: $('#lblDevolucionPrimaModalidad'),
            cmbDevolucionPrimaModalidad: $('#cmbDevolucionPrimaModalidad'),
            lblReembolsoModalidad: $('#lblReembolsoModalidad'),
            chkReembolsoModalidad: $('#chkReembolsoModalidad'),
            lblSegundoTramoModalidad: $('#lblSegundoTramoModalidad'),
            cmbSegundoTramoModalidad: $('#cmbSegundoTramoModalidad'),
            trTemporalReembolso: $('#trTemporalReembolso'),
            cmbAniosTemporalModalidad: $('#cmbAniosTemporalModalidad'),
            btnEliminarModalidad: $('#btnEliminarModalidad'),
            btnAgregarModalidad: $('#btnAgregarModalidad'),
            ObtnerModelo: function () {
                var modalidad = new ClassModalidad();

                modalidad.CodigoMoneda = base.tabModalidades.cmbTipoMonedaModalidad.find('option:selected').val();
                modalidad.TipoAjuste = base.tabModalidades.cmbTipoMonedaModalidad.find('option:selected').data('tipoajuste');
                modalidad.DescripcionMoneda = base.tabModalidades.cmbTipoMonedaModalidad.find('option:selected').text();

                modalidad.CodigoProducto = base.tabModalidades.cmbProductoModalidad.find('option:selected').val();
                modalidad.DescripcionProducto = base.tabModalidades.cmbProductoModalidad.find('option:selected').text();
                //debugger;
                modalidad.CodigoAniosTemporal = base.tabModalidades.cmbAniosTemporalModalidad.find('option:selected').val();
                modalidad.DescripcionAniosTemporal = base.tabModalidades.cmbAniosTemporalModalidad.find('option:selected').text();

                modalidad.CodigoSegundoTramo = base.tabModalidades.cmbSegundoTramoModalidad.is(':visible') ? base.tabModalidades.cmbSegundoTramoModalidad.find('option:selected').val() : '0';
                modalidad.DescripcionSegundoTramo = base.tabModalidades.cmbSegundoTramoModalidad.is(':visible') ? base.tabModalidades.cmbSegundoTramoModalidad.find('option:selected').text() : '0';

                modalidad.IndicadorPeriodoGarantizado = base.tabModalidades.chkPeriodoGarantizadoModalidad.is(':checked');
                modalidad.CodigoAnioPeriodoGarantizado = (base.tabModalidades.cmbPeriodoGarantizadoModalidad.is(':visible') && modalidad.IndicadorPeriodoGarantizado) ? base.tabModalidades.cmbPeriodoGarantizadoModalidad.find('option:selected').val() : '0';
                modalidad.DescripcionAnioPeriodoGarantizado = (base.tabModalidades.cmbPeriodoGarantizadoModalidad.is(':visible') && modalidad.IndicadorPeriodoGarantizado) ? base.tabModalidades.cmbPeriodoGarantizadoModalidad.find('option:selected').text() : '0';

                modalidad.IndicadorDevolucionPrima = base.tabModalidades.chkDevolucionPrimaModalidad.is(':checked');
                modalidad.CodigoDevolucionPrima = (base.tabModalidades.cmbDevolucionPrimaModalidad.is(':visible') && modalidad.IndicadorDevolucionPrima) ? base.tabModalidades.cmbDevolucionPrimaModalidad.find('option:selected').val() : '0';
                modalidad.DescripcionDevolucionPrima = modalidad.CodigoDevolucionPrima = (base.tabModalidades.cmbDevolucionPrimaModalidad.is(':visible') && modalidad.IndicadorDevolucionPrima) ? base.tabModalidades.cmbDevolucionPrimaModalidad.find('option:selected').text() : '0';

                modalidad.IndicadorReembolsoGS = base.tabModalidades.chkReembolsoModalidad.is(':visible') ? base.tabModalidades.chkReembolsoModalidad.is(':checked') : false;
                if (modalidad.IndicadorReembolsoGS) {
                    modalidad.DescripcionReembolsoGS = "Temporal";
                } else {
                    modalidad.DescripcionReembolsoGS = "Vitalicia";
                }

                //Validaciones por Producto
                if (modalidad.CodigoProducto != 'PF') {
                    modalidad.IndicadorDevolucionPrima = false;
                    modalidad.IndicadorReembolsoGS = false;
                }

                if (modalidad.CodigoProducto == 'PI') {
                    modalidad.CodigoAniosTemporal = "0";
                    modalidad.DescripcionAniosTemporal = "0";
                }

                return modalidad;
            },
            eventos: {
                Init: function () {
                    base.tabModalidades.eventos.grdModalidadesInit();
                    base.tabModalidades.eventos.cmbProductoModalidadInit();
                    base.tabModalidades.eventos.cmbTipoMonedaModalidadInit();
                    base.tabModalidades.eventos.cmbAniosTemporalModalidadInit();
                    base.tabModalidades.eventos.cmbPeriodoGarantizadoModalidadInit();
                    base.tabModalidades.eventos.chkDevolucionPrimaModalidadInit();
                    base.tabModalidades.eventos.cmbDevolucionPrimaModalidadInit();
                    base.tabModalidades.eventos.chkReembolsoModalidadInit();
                },
                grdModalidadesInit: function () {
                    base.tabModalidades.grdModalidades.jqGrid({
                        datatype: "local",
                        type: 'post',
                        colNames: [
                            'CodigoModalidad',//CodigoModalidad
                            'CodigoMoneda',//CodigoMoneda
                            'TipoAjuste',//TipoAjuste
                            'Moneda',//DescripcionMoneda
                            'IndicadorMoneda',//IndicadorMoneda
                            'CodigoProducto',//CodigoProducto
                            'Producto', //DescripcionProducto
                            'CodigoAniosTemporal',//CodigoAniosTemporal
                            'Años Temp', //DescripcionAniosTemporal
                            'CodigoSegundoTramo',//CodigoSegundoTramo
                            '2do Tramo%', //DescripcionSegundoTramo
                            'IndicadorPeriodoGarantizado',//IndicadorPeriodoGarantizado
                            'CodigoAnioPeriodoGarantizado',//CodigoAnioPeriodoGarantizado
                            'Años(PG)', //DescripcionAnioPeriodoGarantizado
                            'IndicadorDevolucionPrima',//IndicadorDevolucionPrima
                            'Dev. Prima%',//CodigoDevolucionPrima
                            'DescripcionDevolucionPrima',//DescripcionDevolucionPrima,
                            'IndicadorReembolsoGS',//IndicadorReembolsoGS
                            'Reemb. G.S. Temp.'//DescripcionReembolsoGS
                        ],
                        colModel: [
                            { name: 'CodigoModalidad', index: 'CodigoModalidad', width: 70, hidden: true },
                            { name: 'CodigoMoneda', index: 'CodigoMoneda', hidden: true },
                            { name: 'TipoAjuste', index: 'TipoAjuste', hidden: true },
                            { name: 'DescripcionMoneda', index: 'DescripcionMoneda', width: 70, sortable: false },
                            { name: 'IndicadorMoneda', index: 'IndicadorMoneda', hidden: true },
                            { name: 'CodigoProducto', index: 'CodigoProducto', hidden: true },
                            { name: 'DescripcionProducto', index: 'DescripcionProducto', width: 290, sortable: false },
                            { name: 'CodigoAniosTemporal', index: 'CodigoAniosTemporal', hidden: true },
                            { name: 'DescripcionAniosTemporal', index: 'DescripcionAniosTemporal', width: 125, sortable: false },
                            { name: 'CodigoSegundoTramo', index: 'CodigoSegundoTramo', hidden: true },
                            { name: 'DescripcionSegundoTramo', index: 'DescripcionSegundoTramo', width: 100, sortable: false, hidden: true },
                            { name: 'IndicadorPeriodoGarantizado', index: 'IndicadorPeriodoGarantizado', hidden: true },
                            { name: 'CodigoAnioPeriodoGarantizado', index: 'CodigoAnioPeriodoGarantizado', hidden: true },
                            { name: 'DescripcionAnioPeriodoGarantizado', index: 'DescripcionAnioPeriodoGarantizado', width: 125, sortable: false },
                            { name: 'IndicadorDevolucionPrima', index: 'IndicadorDevolucionPrima', hidden: true },
                            { name: 'CodigoDevolucionPrima', index: 'CodigoDevolucionPrima', width: 125, sortable: false },
                            { name: 'DescripcionDevolucionPrima', index: 'DescripcionDevolucionPrima', hidden: true },
                            { name: 'IndicadorReembolsoGS', index: 'IndicadorReembolsoGS', hidden: true },
                            { name: 'DescripcionReembolsoGS', index: 'DescripcionReembolsoGS', width: 183, sortable: false }
                        ],
                        onSelectRow: base.tabModalidades.eventos.grdModalidadesSelect,
                        rowNum: 100,
                        height: 110,
                        width: 920,
                        autowidth: true,
                        viewrecords: true,
                        caption: ""
                    });
                },
                cmbProductoModalidadInit: function () {
                    base.tabModalidades.cmbProductoModalidad.val('PF');
                    base.tabModalidades.cmbProductoModalidad.trigger('change');
                },
                cmbTipoMonedaModalidadInit: function () {
                    base.tabModalidades.cmbTipoMonedaModalidad.val('S');
                },
                cmbAniosTemporalModalidadInit: function () {
                    base.tabModalidades.cmbAniosTemporalModalidad.val('10');
                },
                chkPeriodoGarantizadoModalidadInit: function () {
                    base.tabModalidades.chkPeriodoGarantizadoModalidad.prop('checked', false);
                    base.tabModalidades.chkPeriodoGarantizadoModalidad.prop('disabled', false);
                },
                cmbPeriodoGarantizadoModalidadInit: function () {
                    base.tabModalidades.cmbPeriodoGarantizadoModalidad.val('10');
                    base.tabModalidades.cmbPeriodoGarantizadoModalidad.prop('disabled', true);
                },
                chkDevolucionPrimaModalidadInit: function () {
                    base.tabModalidades.chkDevolucionPrimaModalidad.prop('checked', false);
                },
                cmbDevolucionPrimaModalidadInit: function () {
                    base.tabModalidades.cmbDevolucionPrimaModalidad.val('25');
                    base.tabModalidades.cmbDevolucionPrimaModalidad.prop('disabled', true);
                },
                chkReembolsoModalidadInit: function () {
                    base.tabModalidades.chkReembolsoModalidad.prop('checked', false);
                },
                ProductosInit: function () {
                    base.tabModalidades.eventos.cmbAniosTemporalModalidadInit();
                    base.tabModalidades.eventos.chkPeriodoGarantizadoModalidadInit();
                    base.tabModalidades.eventos.cmbPeriodoGarantizadoModalidadInit();
                    base.tabModalidades.eventos.chkDevolucionPrimaModalidadInit();
                    base.tabModalidades.eventos.cmbDevolucionPrimaModalidadInit();
                    base.tabModalidades.eventos.chkReembolsoModalidadInit();
                },
                cmbProductoModalidadOnChange: function () {

                    base.tabModalidades.eventos.ProductosInit();

                    if ($(this).val() == 'PI') {
                        base.tabModalidades.trTemporalReembolso.hide();
                        base.tabModalidades.chkDevolucionPrimaModalidad.hide();
                        base.tabModalidades.lblDevolucionPrimaModalidad.hide();
                        base.tabModalidades.cmbDevolucionPrimaModalidad.hide();
                    }
                    if ($(this).val() == 'PE') {
                        base.tabModalidades.trTemporalReembolso.show();
                        base.tabModalidades.chkReembolsoModalidad.hide();
                        base.tabModalidades.lblReembolsoModalidad.hide();
                        base.tabModalidades.lblSegundoTramoModalidad.show();
                        base.tabModalidades.cmbSegundoTramoModalidad.show();
                        base.tabModalidades.chkDevolucionPrimaModalidad.hide();
                        base.tabModalidades.lblDevolucionPrimaModalidad.hide();
                        base.tabModalidades.cmbDevolucionPrimaModalidad.hide();
                    }
                    if ($(this).val() == 'PF') {
                        base.tabModalidades.trTemporalReembolso.show();
                        base.tabModalidades.chkReembolsoModalidad.show();
                        base.tabModalidades.lblReembolsoModalidad.show();
                        base.tabModalidades.chkDevolucionPrimaModalidad.show();
                        base.tabModalidades.lblDevolucionPrimaModalidad.show();
                        base.tabModalidades.cmbDevolucionPrimaModalidad.show();
                        base.tabModalidades.chkPeriodoGarantizadoModalidad.prop('checked', true);
                        base.tabModalidades.chkPeriodoGarantizadoModalidad.prop('disabled', true);
                        base.tabModalidades.cmbPeriodoGarantizadoModalidad.prop('disabled', false);
                        base.tabModalidades.lblSegundoTramoModalidad.hide();
                        base.tabModalidades.cmbSegundoTramoModalidad.hide();
                    }
                },
                cmbAniosTemporalModalidadOnChange: function () {
                    var intAniosTemporal = base.tabModalidades.cmbAniosTemporalModalidad.find('option:selected').text();
                    var strFilter = 'option[value="' + intAniosTemporal + '"]';

                    if (base.tabModalidades.cmbPeriodoGarantizadoModalidad.find(strFilter).length > 0) {
                        base.tabModalidades.cmbPeriodoGarantizadoModalidad.val(intAniosTemporal);
                    }
                },
                chkPeriodoGarantizadoModalidadOnChange: function () {
                    if (base.tabModalidades.chkPeriodoGarantizadoModalidad.is(':checked')) {
                        base.tabModalidades.cmbPeriodoGarantizadoModalidad.prop('disabled', false);
                    } else {
                        base.tabModalidades.cmbPeriodoGarantizadoModalidad.prop('disabled', true);
                    }
                },
                chkDevolucionPrimaModalidadOnChange: function () {
                    if (base.tabModalidades.chkDevolucionPrimaModalidad.is(':checked')) {
                        base.tabModalidades.cmbDevolucionPrimaModalidad.prop('disabled', false);
                    } else {
                        base.tabModalidades.cmbDevolucionPrimaModalidad.prop('disabled', true);
                    }
                },
                grdModalidadesSelect: function (index) {
                    if (base.estado == estadoPantalla.Editable) {
                        var sm_grid = base.tabModalidades.grdModalidades;
                        var sm_rowData = sm_grid.getRowData(index);

                        var sm_CodigoAnioPeriodoGarantizado = sm_rowData['CodigoAnioPeriodoGarantizado'];
                        var sm_CodigoAniosTemporal = sm_rowData['CodigoAniosTemporal'];
                        var sm_CodigoDevolucionPrima = sm_rowData['CodigoDevolucionPrima'];
                        var sm_CodigoModalidad = sm_rowData['CodigoModalidad'];
                        var sm_CodigoMoneda = sm_rowData['CodigoMoneda'];
                        var sm_CodigoProducto = sm_rowData['CodigoProducto'];
                        var sm_CodigoSegundoTramo = sm_rowData['CodigoSegundoTramo'];
                        var sm_IndicadorDevolucionPrima = sm_rowData['IndicadorDevolucionPrima'];
                        var sm_IndicadorMoneda = sm_rowData['IndicadorMoneda'];
                        var sm_IndicadorPeriodoGarantizado = sm_rowData['IndicadorPeriodoGarantizado'];
                        var sm_IndicadorReembolsoGS = sm_rowData['IndicadorReembolsoGS'];
                        var sm_TipoAjuste = sm_rowData['TipoAjuste'];

                        debugger;
                        /*Mostrar controles por producto*/
                        base.tabModalidades.cmbProductoModalidad.val(sm_CodigoProducto);
                        base.tabModalidades.cmbProductoModalidad.trigger('change');
                        /*Seleccionar moneda por tipo de ajuste*/
                        base.tabModalidades.cmbTipoMonedaModalidad.find(':selected').prop('selected', false);
                        base.tabModalidades.cmbTipoMonedaModalidad.find('option[value="' + sm_CodigoMoneda + '"]').filter('[data-tipoajuste="' + sm_TipoAjuste + '"]').prop('selected', true);

                        if (sm_CodigoAniosTemporal == "0") {
                            base.tabModalidades.eventos.cmbAniosTemporalModalidadInit
                        } else {
                            base.tabModalidades.cmbAniosTemporalModalidad.val(sm_CodigoAniosTemporal);
                        }

                        /*Opciones Adicionales*/
                        if (sm_IndicadorPeriodoGarantizado == "true") {
                            base.tabModalidades.chkPeriodoGarantizadoModalidad.prop('checked', true);
                            base.tabModalidades.cmbPeriodoGarantizadoModalidad.prop('disabled', false);
                            base.tabModalidades.cmbPeriodoGarantizadoModalidad.val(sm_CodigoAnioPeriodoGarantizado);
                        } else {
                            base.tabModalidades.chkPeriodoGarantizadoModalidad.prop('checked', false);
                            base.tabModalidades.eventos.cmbPeriodoGarantizadoModalidadInit();
                        }
                        if (sm_IndicadorDevolucionPrima == "true") {
                            base.tabModalidades.chkDevolucionPrimaModalidad.prop('checked', true);
                            base.tabModalidades.cmbDevolucionPrimaModalidad.prop('disabled', false);
                            base.tabModalidades.cmbDevolucionPrimaModalidad.val(sm_CodigoDevolucionPrima);
                        } else {
                            base.tabModalidades.chkDevolucionPrimaModalidad.prop('checked', false);
                            base.tabModalidades.eventos.cmbDevolucionPrimaModalidadInit();
                        }
                        if (sm_IndicadorReembolsoGS == "true") {
                            base.tabModalidades.chkReembolsoModalidad.prop('checked', true);
                        } else {
                            base.tabModalidades.chkReembolsoModalidad.prop('checked', false);
                        }
                    }
                },
                btnAgregarModalidadOnClick: function () {
                    debugger;
                    var modalidad = base.tabModalidades.ObtnerModelo();

                    base.tabModalidades.btnAgregarModalidad.prop("disabled", true);
                    if (base.tabModalidades.Validaciones.validarModalidad(modalidad)) {
                        var rowId = base.Helpers.guid();
                        base.tabModalidades.grdModalidades.addRowData(rowId, modalidad);
                        base.tabResumen.grdResumenAddRow(rowId, modalidad);
                    }
                    base.tabModalidades.btnAgregarModalidad.prop("disabled", false);
                },
                btnEliminarModalidadOnClick: function () {
                    var codigoModalidad;
                    var rowId = base.tabModalidades.grdModalidades.jqGrid('getGridParam', 'selrow');
                    if (rowId) {
                        var ret = base.tabModalidades.grdModalidades.jqGrid('getRowData', rowId);
                        base.tabModalidades.grdModalidades.delRowData(rowId)
                        base.tabResumen.grdResumenDelRow(rowId);
                    } else {
                        base.frmMensaje.eventos.MostrarMensaje(0, 'Modalidades', '<ul><li>Selecciona una fila</li><ul>');
                    }
                }
            },
            Validaciones: {
                validarModalidad: function (modalidad) {
                    var validacionesOK = true;
                    var mensajeValidacion = '<ul>';

                    if (base.tabModalidades.Validaciones.ObtenerNumeroModalidades() == base.NumeroModalidadesMaxima) {
                        mensajeValidacion += '<li>Alcanzó el límite máximo de modalidades. Solo es permitido ingresar hasta ' + base.NumeroModalidadesMaxima.toString() + ' modalidades</li>';
                        validacionesOK = false;
                    } else {

                        if (modalidad.CodigoProducto == 'PF') {
                            if (!modalidad.IndicadorPeriodoGarantizado) {
                                mensajeValidacion += '<li>Si el producto es ' + modalidad.DescripcionProducto + ' se debe escoger la opcion de periodo garantizado</li>';
                                validacionesOK = false;
                            }
                        }

                        if (modalidad.CodigoProducto == 'PF' || modalidad.CodigoProducto == 'PE') {
                            var aniosT = parseInt(modalidad.CodigoAniosTemporal);
                            var aniosPG = parseInt(modalidad.CodigoAnioPeriodoGarantizado);

                            if (modalidad.CodigoProducto == 'PF') {
                                if (aniosT != aniosPG) {
                                    mensajeValidacion += '<li>Si el producto es ' + modalidad.DescripcionProducto + ' los años temporales deben ser iguales a los años de periodo garantizado</li>';
                                    validacionesOK = false;
                                }
                            }

                            if (modalidad.CodigoProducto == 'PE') {
                                if (modalidad.IndicadorPeriodoGarantizado && aniosT != aniosPG) {
                                    mensajeValidacion += '<li>Si el producto es ' + modalidad.DescripcionProducto + ' los años temporales deben ser iguales a los años de periodo garantizado</li>';
                                    validacionesOK = false;
                                }
                            }

                        }

                        if (base.tabModalidades.Validaciones.ExisteModalidad(modalidad) != null) {
                            mensajeValidacion += '<li>La modalidad a agregar ya existe, por favor pruebe otra combinacion de valores</li>';
                            validacionesOK = false;
                        }
                    }

                    if (!validacionesOK) {
                        mensajeValidacion + '</ul>';
                        base.frmMensaje.eventos.MostrarMensaje(0, 'Modalidades', mensajeValidacion);
                    }

                    return validacionesOK;
                },
                ExisteModalidad: function (modalidad) {
                    var grid = base.tabModalidades.grdModalidades;
                    var rowIds = grid.getDataIDs();
                    var rowId = null;
                    //debugger;
                    for (var i = 0; i < rowIds.length; i++) {
                        var rowData = grid.getRowData(rowIds[i]);
                        rowId = rowIds[i];
                        for (var key in modalidad) {
                            if (key != 'CodigoModalidad' && key != 'DescripcionDevolucionPrima') {
                                var tipo = typeof modalidad[key];
                                if (tipo == 'boolean') { rowData[key] = (rowData[key] == 'true'); }
                                if (rowData[key] != modalidad[key]) {
                                    rowId = null;
                                    break
                                }
                            }
                        }
                        if (rowId != null) {
                            break;
                        }
                    }

                    return rowId;
                },
                ObtenerNumeroModalidades: function (modalidad) {
                    var grid = base.tabModalidades.grdModalidades;
                    var rowIds = grid.getDataIDs();

                    return rowIds.length;
                },
            }
        };
        this.tabResumen = {
            _self: $('#resumenCotizacion'),
            _link: $('a[href="#resumenCotizacion"]'),
            btnEvaluacionFin: $('#btnEvaluacionFin'),//HND(AMQ) P02190 DS-06518 (DA) 2017-05-03 boton reporte Evaluación Financiera
            btnCotizacionDeshacer: $('#btnCotizacionDeshacer'),
            btnCartaOficial: $('#btnCartaOficial'),//HND(AMQ) P02190 DS-06518 (DA) 2017-05-03 boton reporte Carta Oficial
            btnModObjetivo: $('#btnModObjetivo'),//HND (AMQ) P02190 DS-06518 (DA) 2017-05-03 boton Modificar objetivo
            btnModObjetivoVal: $('#btnModObjetivoVal'),//HND (AMQ) P02190 DS-06518 (DA) 2017-05-03 boton reporte Carta Oficial
            btnModObjCerrar: $('#btnModObjCerrar'),//HND (AMQ) P02190 DS-06518 (DA) 2017-05-03 boton cerrar validación credenciales

            btnCotizacionResumen: $('#btnCotizacionResumen'),
            grdResumen: $('#grdResumen'),
            eventos: {
                Init: function () {
                    base.tabResumen.eventos.grdResumenInit();
                },
                _linkOnClick: function () {
                    if ($(this).hasClass('disabled')) {
                        return false;
                    }
                },
                //HND(AMQ) P02190 DS-06518 (DA) 2017-05-03 botones nuevos reportes - INICIO
                btnEvaluacionFinInit: function () {
                    base.tabResumen.btnEvaluacionFin.prop('disabled', true);
                },
                btnCartaOficialInit: function () {
                    base.tabResumen.btnCartaOficial.prop('disabled', true);
                },
                btnModObjetivoInit: function () {
                    base.tabResumen.btnModObjetivo.prop('disabled', true);
                },
                btnModObjetivoValInit: function () {
                    base.tabResumen.btnModObjetivoVal.prop('disabled', true);
                },
                //HND(AMQ) P02190 DS-06518 (DA) 2017-05-03 botones nuevos reportes - FIN
                btnCotizacionResumenInit: function () {
                    base.tabResumen.btnCotizacionResumen.prop('disabled', true);
                },
                grdResumenInit: function () {
                    base.tabResumen.grdResumen.jqGrid({
                        datatype: "local",
                        colNames: [
                            '#', //NumeroCotizacion
                            'CodigoMoneda',//CodigoMoneda
                            'TipoAjuste',//TipoAjuste
                            'Moneda',//DescripcionMoneda 
                            'CodigoModalidad',//CodigoModalidad
                            'Modalidad', //DescripcionModalidad
                            'CodigoNivelAutorizacion',//CodigoNivelAutorizacion
                            'Niv.', //DescripcionNivelAutorizacion
                            'CodigoModalidadCalculo',//CodigoModalidadCalculo
                            'Mod.',//DescripcionModalidadCalculo
                            'Tasa Venta Obj',//TasaVentaObjetivo,
                            'TIR Obj',//TIRObjetivo
                            'Pensión Obj',//PensionObjetivo
                            'Tasa Venta',//TasaVenta
                            'Tasa AFP',//TasaAFP
                            'CRU Total',//CRUTotal
                            'Pensión AFP',//PensionAFP
                            'Pensión PV',//PensionPV
                            'Exc. Dur.',//ExcesoDuracion
                            'Spread',//Spread
                            'TIR',//TIR
                            'CodigoEstado',//CodigoEstado
                            'Estado'//DescripcionEstado
                        ],
                        colModel: [
                            { name: 'NumeroCotizacion', index: 'NumeroCotizacion', width: 20, hidden: true, align: 'right' },
                            { name: 'CodigoMoneda', index: 'CodigoMoneda', sortable: false, hidden: true },
                            { name: 'TipoAjuste', index: 'TipoAjuste', sortable: false, hidden: true },
                            { name: 'DescripcionMoneda', index: 'DescripcionMoneda', width: 55, sortable: false },
                            { name: 'CodigoModalidad', index: 'CodigoModalidad', sortable: false, hidden: true },
                            { name: 'DescripcionModalidad', index: 'DescripcionModalidad', width: 300, sortable: false },
                            { name: 'CodigoNivelAutorizacion', index: 'CodigoNivelAutorizacion', sortable: false, hidden: true },
                            { name: 'DescripcionNivelAutorizacion', index: 'DescripcionNivelAutorizacion', width: 30, sortable: false },
                            { name: 'CodigoModalidadCalculo', index: 'CodigoModalidadCalculo', sortable: false, hidden: true },
                            { name: 'DescripcionModalidadCalculo', index: 'DescripcionModalidadCalculo', width: 35, sortable: false },
                            { name: 'TasaVentaObjetivo', index: 'TasaVentaObjetivo', width: 100, sortable: false, formatter: 'currency', formatoptions: { decimalSeparator: '.', decimalPlaces: 4, suffix: '%' }, align: 'right' },
                            { name: 'TIRObjetivo', index: 'TIRObjetivo', width: 80, sortable: false, formatter: 'currency', formatoptions: { decimalSeparator: '.', decimalPlaces: 4, suffix: '%' }, align: 'right' },
                            { name: 'PensionObjetivo', index: 'PensionObjetivo', width: 80, sortable: false, align: 'right' },
                            { name: 'TasaVenta', index: 'TasaVenta', width: 80, sortable: false, formatter: 'currency', formatoptions: { decimalSeparator: '.', decimalPlaces: 4, suffix: '%' }, align: 'right' },
                            { name: 'TasaAFP', index: 'TasaAFP', width: 80, sortable: false, formatter: 'currency', formatoptions: { decimalSeparator: '.', decimalPlaces: 4, suffix: '%' }, align: 'right', hidden: true },
                            { name: 'CRUTotal', index: 'CRUTotal', width: 100, sortable: false, align: 'right' },
                            { name: 'PensionAFP', index: 'PensionAFP', width: 100, sortable: false, align: 'right', hidden: true },
                            { name: 'PensionPV', index: 'PensionPV', width: 100, sortable: false, align: 'right' },
                            { name: 'ExcesoDuracion', index: 'ExcesoDuracion', width: 100, sortable: false, align: 'right' },
                            { name: 'Spread', index: 'Spread', width: 100, sortable: false, align: 'right' },
                            { name: 'TIR', index: 'TIR', width: 100, sortable: false, formatter: 'currency', formatoptions: { decimalSeparator: '.', decimalPlaces: 4, suffix: '%' }, align: 'right' },
                            { name: 'CodigoEstado', index: 'CodigoEstado', width: 100, sortable: false, hidden: true },
                            { name: 'DescripcionEstado', index: 'DescripcionEstado', width: 200, sortable: false }
                        ],
                        rowNum: 100,
                        height: 110,
                        width: 910,
                        autowidth: true,
                        viewrecords: true,
                        multiselect: true,
                        caption: "",
                        shrinkToFit: false
                    });
                },

                //HND(AMQ) P02190 DS-06518 (DA) 2017-05-03 botones reportes Evaluación Financiera y Carta Oficialde Cotización - INICIO
                //se agregan los eventos
                btnEvaluacionFinOnClick: function () {
                    //debugger;
                    var solicitud = base.ObtenerModelo();
                    //if (!base.Validaciones.ExisteCotizacionesSinCalcular(solicitud) && base.Validaciones.ExisteCotizacionesCalculadasAceptadas(solicitud)) {
                    //if (solicitud.NumeroSolicitud != 0 && solicitud.NumeroSolicitud != '') {
                    //debugger;
                    var winReport = window.open('');
                    var HtmlWinReport = '';
                    HtmlWinReport += '<title>Solicitud Nro ' + solicitud.NumeroSolicitud + '</title>';
                    HtmlWinReport += '<link href="' + window.rootPath + 'Content/bootstrap.css" rel="stylesheet"/>';
                    HtmlWinReport += '<link href="' + window.rootPath + 'Content/site.css" rel="stylesheet"/>';
                    HtmlWinReport += '<button type="button" id="btnImprimir" class="btn btn-info loginSubmit" style="margin-left:10px;margin-top:10px;"><span class="glyphicon glyphicon-print"></span>&nbsp;Imprimir</button>';
                    HtmlWinReport += '<iframe id="ifrmReporte" ';
                    HtmlWinReport += '  src="' + window.rootPath + 'Reportes/EvaluacionFinanciera/' + solicitud.NumeroSolicitud + '" ';
                    HtmlWinReport += '  frameborder="0" width=100% height=90% ';
                    HtmlWinReport += '  style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;width:100%;height:94%;" ';
                    HtmlWinReport += '  ">';
                    HtmlWinReport += '</iframe>';
                    HtmlWinReport += '<script src="' + window.rootPath + 'Scripts/jquery-3.1.1.js"></script>';
                    HtmlWinReport += '<script src="' + window.rootPath + 'Scripts/app/view/reporte/Reporte.js"></script>';

                    winReport.document.title = 'Solicitud Nro ' + solicitud.NumeroSolicitud;
                    winReport.document.write(HtmlWinReport);
                    //}
                    //} else {
                    //    base.frmMensaje.eventos.MostrarMensaje(0, 'Evaluación Final', '<ul><li>Para emitir el reporte todas las cotizaciones deben estar calculadas y por lo menos una debe estar aceptada</li><ul>');
                    //}
                },

                btnCartaOficialOnClick: function () {

                    var solicitud = base.ObtenerModelo();
                    debugger;
                    if (solicitud.Estado != "4") {
                        if (!base.Validaciones.ExisteCotizacionesSinCalcular(solicitud) && base.Validaciones.ExisteCotizacionesCalculadasAceptadas(solicitud)) {
                            if (solicitud.NumeroSolicitud != 0 && solicitud.NumeroSolicitud != '') {

                                base.frmMensaje.eventos.MostrarMensaje(1, 'Carta Oficial de Cotización', '<ul><li>Al generar la Carta Oficial de Cotización, la solicitud sera Aprobada y pasara a un estado en el que no se podra editar nuevamente ¿Desea continuar?.</li><ul>', {
                                    onClickBtn1: function () {

                                        $.ajax({
                                            cache: false,
                                            async: true,
                                            type: "POST",
                                            url: window.rootPath + 'SolicitudParticular/ActualizarEstadoSolicitud',
                                            data: { idSolicitud: solicitud.NumeroSolicitud },
                                            success: function (solicitudServer) {

                                                base.frmMensaje.eventos.MostrarMensaje(2, 'Solicitud Particular', '<ul><li>Se aprobo la solicitud de manera satisfactoria</li></ul>');
                                                base.notificacionSolicitud.eventos.Evaluar(solicitudServer);
                                                base.txtEstado = "4";
                                            },
                                            error: function (data) {
                                                base.frmMensaje.eventos.MostrarMensaje(3, 'Solicitud Particular', '<ul><li>Ocurrió un error al Aprobar la Solicitud</li></ul>');
                                            },
                                            complete: function () {

                                                var rowIds = base.tabResumen.grdResumen.jqGrid('getGridParam', 'selarrrow');
                                                var numeroCotizaciones = '';

                                                for (var i = 0; i < rowIds.length; i++) {
                                                    var row = base.tabResumen.grdResumen.getRowData(rowIds[i]);
                                                    if (row.CodigoEstado != 1) {
                                                        numeroCotizaciones += (row.NumeroCotizacion) + 's';
                                                    }
                                                }



                                                if (numeroCotizaciones.length > 0) {
                                                    var winReport = window.open('');
                                                    var HtmlWinReport = '';
                                                    HtmlWinReport += '<title>Solicitud Nro ' + solicitud.NumeroSolicitud + '</title>';
                                                    HtmlWinReport += '<link href="' + window.rootPath + 'Content/bootstrap.css" rel="stylesheet"/>';
                                                    HtmlWinReport += '<link href="' + window.rootPath + 'Content/site.css" rel="stylesheet"/>';
                                                    HtmlWinReport += '<button type="button" id="btnImprimir" class="btn btn-info loginSubmit" style="margin-left:10px;margin-top:10px;"><span class="glyphicon glyphicon-print"></span>&nbsp;Imprimir</button>';
                                                    HtmlWinReport += '<iframe id="ifrmReporte" ';
                                                    HtmlWinReport += '  src="' + window.rootPath + 'Reportes/CartaOficialCotizacion?id=' + solicitud.NumeroSolicitud + '&cotizaciones=' + numeroCotizaciones + '" ';
                                                    HtmlWinReport += '  frameborder="0" width=100% height=90% ';
                                                    HtmlWinReport += '  style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;width:100%;height:94%;" ';
                                                    HtmlWinReport += '  ">';
                                                    HtmlWinReport += '</iframe>';
                                                    HtmlWinReport += '<script src="' + window.rootPath + 'Scripts/jquery-3.1.1.js"></script>';
                                                    HtmlWinReport += '<script src="' + window.rootPath + 'Scripts/app/view/reporte/Reporte.js"></script>';

                                                    winReport.document.title = 'Solicitud Nro ' + solicitud.NumeroSolicitud;
                                                    winReport.document.write(HtmlWinReport);
                                                } else {
                                                    base.frmMensaje.eventos.MostrarMensaje(2, 'Resumen cotización', '<ul><li>Se aprobo la solicitud de manera satisfactoria</li></ul><ul><li>Debe seleccionar por lo menos una cotización aceptada para generar la Carta</li><ul>');
                                                }

                                            },
                                        })
                                    }
                                });
                            }
                        }
                        else {
                            base.frmMensaje.eventos.MostrarMensaje(0, 'Carta Oficial de Cotización', '<ul><li>Para emitir la Carta Oficial, todas las cotizaciones deben estar calculadas y por lo menos una debe estar aceptada</li><ul>');
                        }
                    } else {

                        debugger;
                        var rowIds = base.tabResumen.grdResumen.jqGrid('getGridParam', 'selarrrow');
                        var numeroCotizaciones = '';

                        for (var i = 0; i < rowIds.length; i++) {
                            var row = base.tabResumen.grdResumen.getRowData(rowIds[i]);
                            if (row.CodigoEstado != 1) {
                                numeroCotizaciones += (row.NumeroCotizacion) + 's';
                            }
                        }

                        if (numeroCotizaciones.length > 0) {
                            var winReport = window.open('');
                            var HtmlWinReport = '';
                            HtmlWinReport += '<title>Solicitud Nro ' + solicitud.NumeroSolicitud + '</title>';
                            HtmlWinReport += '<link href="' + window.rootPath + 'Content/bootstrap.css" rel="stylesheet"/>';
                            HtmlWinReport += '<link href="' + window.rootPath + 'Content/site.css" rel="stylesheet"/>';
                            HtmlWinReport += '<button type="button" id="btnImprimir" class="btn btn-info loginSubmit" style="margin-left:10px;margin-top:10px;"><span class="glyphicon glyphicon-print"></span>&nbsp;Imprimir</button>';
                            HtmlWinReport += '<iframe id="ifrmReporte" ';
                            HtmlWinReport += '  src="' + window.rootPath + 'Reportes/CartaOficialCotizacion?id=' + solicitud.NumeroSolicitud + '&cotizaciones=' + numeroCotizaciones + '" ';
                            HtmlWinReport += '  frameborder="0" width=100% height=90% ';
                            HtmlWinReport += '  style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;width:100%;height:94%;" ';
                            HtmlWinReport += '  ">';
                            HtmlWinReport += '</iframe>';
                            HtmlWinReport += '<script src="' + window.rootPath + 'Scripts/jquery-3.1.1.js"></script>';
                            HtmlWinReport += '<script src="' + window.rootPath + 'Scripts/app/view/reporte/Reporte.js"></script>';

                            winReport.document.title = 'Solicitud Nro ' + solicitud.NumeroSolicitud;
                            winReport.document.write(HtmlWinReport);
                        } else {
                            base.frmMensaje.eventos.MostrarMensaje(2, 'Resumen cotización', '<ul><li>Debe seleccionar por lo menos una cotización aceptada para generar la Carta</li><ul>');
                        }
                    }




                },



                btnModObjetivoOnClick: function () {
                    var rowIds = base.tabResumen.grdResumen.jqGrid('getGridParam', 'selarrrow');
                    var numeroCotizaciones = new Array();
                    var solicitud = base.ObtenerModelo();
                    //debugger;
                    if (rowIds.length > 0) {
                        var solicitud = base.ObtenerModelo();
                        for (var i = 0; i < rowIds.length; i++) {
                            var row = base.tabResumen.grdResumen.getRowData(rowIds[i]);
                            if (row.CodigoEstado = 1) { numeroCotizaciones.push(row.NumeroCotizacion); }
                        }
                        //debugger;
                        if (numeroCotizaciones.length > 0) {
                            if (base.Validaciones.ExisteCotizacionesSinCalcular(solicitud)) {
                                $('#valUsu').modal('show')
                            } else {
                                base.frmMensaje.eventos.MostrarMensaje(0, 'Resumen cotización', '<ul><li>No existen cotizaciones en estado Registrada</li></ul>');
                            }
                        } else {
                            base.frmMensaje.eventos.MostrarMensaje(0, 'Resumen cotización', '<ul><li>Debe seleccionar por lo menos una cotización sin calcular</li><ul>');
                        }

                    } else {
                        base.frmMensaje.eventos.MostrarMensaje(0, 'Resumen cotización', '<ul><li>Debe seleccionar por lo menos una cotización sin calcular</li><ul>');
                    }

                },

                btnModObjCerrarOnClick: function () { $('#valUsu').modal('hide'); },
                btnModObjetivoValOnClick: function () {
                    var solicitud = base.ObtenerModelo();
                    var usuarioID = $('#IdUsuario').val();
                    var usuarioClave = $('#Clave').val();
                    debugger;
                    $.ajax({
                        cache: false,
                        async: true,
                        type: "POST",
                        url: window.rootPath + 'SolicitudParticular/ModificarObjetivo',
                        data: { usuarioID: usuarioID, usuarioClave: usuarioClave, solicitud: solicitud },
                        success: function (result) {
                            debugger;

                            //$('#modalModObjetivo').modal('show');

                            if (result == 'errorPerfil') {
                                base.frmMensaje.eventos.MostrarMensaje(3, 'Solicitud Particular', '<ul><li>El Usuario no tiene el perfil adecuado para realizar el cambio.</li></ul>');
                            } else if (result == 'errorClave') {
                                base.frmMensaje.eventos.MostrarMensaje(3, 'Solicitud Particular', '<ul><li>El Usuario y/o contraseña no coinciden, por favor verificar.</li></ul>');
                            } else {
                                $('#valUsu').modal('hide');
                                $("#modalModObjetivo").modal({
                                    backdrop: 'static',
                                    keyboard: true,
                                    show: true
                                });
                                $('#resultaMod').html(result);
                            }
                            debugger;
                        },
                        error: function (data) {
                            debugger;
                            base.frmMensaje.eventos.MostrarMensaje(3, 'Solicitud Particular', '<ul><li>Ocurrió un error al ingresar a la modificación de objetivo.</li></ul>');
                        },
                        complete: function () {
                            debugger;
                            //loader.hide();
                        }
                    })
                },
                //HND(AMQ) P02190 DS-06518 (DA) 2017-05-03 botones reportes Evaluación Financiera y Carta Oficialde Cotización - FIN
                btnCotizacionDeshacerOnClick: function () {
                    debugger;
                    var rowIds = base.tabResumen.grdResumen.jqGrid('getGridParam', 'selarrrow');
                    var numeroCotizaciones = new Array();
                    if (rowIds.length > 0) {
                        var solicitud = base.ObtenerModelo();

                        for (var i = 0; i < rowIds.length; i++) {
                            var row = base.tabResumen.grdResumen.getRowData(rowIds[i]);
                            if (row.CodigoEstado != 1) {
                                numeroCotizaciones.push(row.NumeroCotizacion);
                            }
                        }
                        if (numeroCotizaciones.length > 0) {
                            var loader = new base.Helpers.windowLoadig();
                            loader.show({ titulo: 'Solicitud Particular', contenido: 'Deshaciendo cotizaciones de solicitud' });
                            $.ajax({
                                type: 'POST',
                                url: window.rootPath + 'SolicitudParticular/DeshacerCotizacionesSolicitud',
                                ContentType: "application/json; charset=utf-8",
                                data: { numeroSolicitud: solicitud.NumeroSolicitud, numeroGrupo: solicitud.NumeroGrupo, numeroCotizaciones: numeroCotizaciones },
                                success: function (solicitudServer) {
                                    base.btnGrabar.text('Grabar');
                                    base.AsignarModelo(base.Helpers.ConvertDateStringToDate(solicitudServer));
                                    base.frmMensaje.eventos.MostrarMensaje(2, 'Solicitud Particular', '<ul><li>Se deshacieron correctamente las cotizaciones de la solicitud</li></ul>');
                                    base.notificacionSolicitud.eventos.Evaluar(solicitudServer);
                                },
                                error: function (data) {
                                    base.frmMensaje.eventos.MostrarMensaje(3, 'Solicitud Particular', '<ul><li>Ocurrió un error al deshacer las cotizotizaciones de la solicitud</li></ul>');
                                },
                                complete: function () {
                                    loader.hide();
                                }
                            });
                        } else {
                            base.frmMensaje.eventos.MostrarMensaje(0, 'Resumen cotización', '<ul><li>Debe seleccionar por lo menos una cotización calculada</li><ul>');
                        }
                    } else {
                        base.frmMensaje.eventos.MostrarMensaje(0, 'Resumen cotización', '<ul><li>Debe seleccionar por lo menos una cotización calculada</li><ul>');
                    }
                },
                btnCotizacionResumenOnClick: function () {
                    //debugger;
                    var solicitud = base.ObtenerModelo();
                    if (!base.Validaciones.ExisteCotizacionesSinCalcular(solicitud) && base.Validaciones.ExisteCotizacionesCalculadasAceptadas(solicitud)) {
                        if (solicitud.NumeroSolicitud != 0 && solicitud.NumeroSolicitud != '') {
                            //debugger;
                            var winReport = window.open('');
                            var HtmlWinReport = '';
                            HtmlWinReport += '<title>Solicitud Nro ' + solicitud.NumeroSolicitud + '</title>';
                            HtmlWinReport += '<link href="' + window.rootPath + 'Content/bootstrap.css" rel="stylesheet"/>';
                            HtmlWinReport += '<link href="' + window.rootPath + 'Content/site.css" rel="stylesheet"/>';
                            HtmlWinReport += '<button type="button" id="btnImprimir" class="btn btn-info loginSubmit" style="margin-left:10px;margin-top:10px;"><span class="glyphicon glyphicon-print"></span>&nbsp;Imprimir</button>';
                            HtmlWinReport += '<iframe id="ifrmReporte" ';
                            HtmlWinReport += '  src="' + window.rootPath + 'Reportes/ResumenCotizacion/' + solicitud.NumeroSolicitud + '" ';
                            HtmlWinReport += '  frameborder="0" width=100% height=90% ';
                            HtmlWinReport += '  style="overflow:hidden;overflow-x:hidden;overflow-y:hidden;width:100%;height:94%;" ';
                            HtmlWinReport += '  ">';
                            HtmlWinReport += '</iframe>';
                            HtmlWinReport += '<script src="' + window.rootPath + 'Scripts/jquery-3.1.1.js"></script>';
                            HtmlWinReport += '<script src="' + window.rootPath + 'Scripts/app/view/reporte/Reporte.js"></script>';

                            winReport.document.title = 'Solicitud Nro ' + solicitud.NumeroSolicitud;
                            winReport.document.write(HtmlWinReport);
                        }
                    } else {
                        base.frmMensaje.eventos.MostrarMensaje(0, 'Resumen cotización', '<ul><li>Para emitir el reporte todas las cotizaciones deben estar calculadas y por lo menos una debe estar aceptada</li><ul>');
                    }
                }
            },
            grdResumenAddRow: function (rowId, modalidad) {
                var cotizacion = new ClassCotizacion();

                cotizacion.NumeroCotizacion = 0;
                cotizacion.CodigoMoneda = modalidad.CodigoMoneda;
                cotizacion.TipoAjuste = modalidad.TipoAjuste;
                cotizacion.DescripcionMoneda = modalidad.DescripcionMoneda;
                cotizacion.CodigoModalidad = '';
                cotizacion.DescripcionModalidad = '';
                cotizacion.CodigoNivelAutorizacion = '';
                cotizacion.DescripcionNivelAutorizacion = 0;
                cotizacion.CodigoModalidadCalculo = '';
                cotizacion.DescripcionModalidadCalculo = 1;
                cotizacion.TasaVentaObjetivo = 0;
                cotizacion.TIRObjetivo = 0.0;
                cotizacion.PensionObjetivo = 0;
                cotizacion.TasaVenta = 0;
                cotizacion.TasaAFP = 0;
                cotizacion.CRUTotal = 0;
                cotizacion.PensionAFP = 0;
                cotizacion.PensionPV = 0;
                cotizacion.ExcesoDuracion = 0;
                cotizacion.Spread = 0;
                cotizacion.TIR = 0;
                cotizacion.CodigoEstado = '';
                cotizacion.DescripcionEstado = 'SIN REGISTRAR';

                base.tabResumen.grdResumen.addRowData(rowId, cotizacion);
            },
            grdResumenDelRow: function (rowId) {
                base.tabResumen.grdResumen.delRowData(rowId);
            }
        };
        this.ObtenerModelo = function () {
            var solicitud = new ClassSolicitud();

            solicitud.NumeroSolicitud = base.txtNumeroSolicitud.val();
            solicitud.NumeroGrupo = base.txtNumeroGrupo.val();
            solicitud.CUSPP = base.txtCUSPP.val();
            solicitud.NombreAsegurado = base.txtAsegurado.val();
            solicitud.TipoMonedaPrima = base.cmbTipoMonedaPrima.find('option:selected').val();
            solicitud.MontoPrima = base.txtMontoPrima.val();
            solicitud.TipoDocumento = base.cmbTipoDocumento.find('option:selected').val();
            solicitud.NumeroDocumento = base.txtNumeroDocumento.val();
            solicitud.FechaDevengue = base.datepickerFechaDevenge.datepicker('getDate');
            solicitud.FechaDevengue = (solicitud.FechaDevengue != null && solicitud.FechaDevengue != undefined) ? solicitud.FechaDevengue.toISOString() : null;
            solicitud.FechaCotizacion = base.datepickerFechaCotizacion.datepicker('getDate');
            solicitud.FechaCotizacion = (solicitud.FechaCotizacion != null & solicitud.FechaCotizacion != undefined) ? solicitud.FechaCotizacion.toISOString() : null;
            solicitud.CodigoModalidadVenta = base.cmbModalidad.find('option:selected').val();
            solicitud.FechaTipoCambio = base.datepickerFechaTipoCambio.datepicker('getDate');
            solicitud.FechaTipoCambio = (solicitud.FechaTipoCambio != null && solicitud.FechaTipoCambio != undefined) ? solicitud.FechaTipoCambio.toISOString() : null;
            solicitud.TipoCambio = base.txtTipoCambio.val();
            solicitud.CodigoAsesor = base.cmbAsesor.find('option:selected').val();
            solicitud.Beneficiarios = base.Helpers.ConvertDateToISOString(base.tabBeneficiarios.grdBeneficiarios.jqGrid('getGridParam', 'data'));
            solicitud.Modalidades = base.tabModalidades.grdModalidades.jqGrid('getGridParam', 'data');
            solicitud.Cotizaciones = base.tabResumen.grdResumen.jqGrid('getGridParam', 'data');
            solicitud.Estado = base.txtEstado;//HND(PBH) P02190 DS-06518 2017/05/15

            return solicitud;
        };
        this.AsignarModelo = function (solicitud) {

            if (solicitud.NumeroSolicitud != 0) {
                base.txtNumeroSolicitud.val(solicitud.NumeroSolicitud);
                base.txtNumeroGrupo.val(solicitud.NumeroGrupo);
                base.txtCUSPP.val(solicitud.CUSPP);
                base.txtAsegurado.val(solicitud.NombreAsegurado);
                base.cmbTipoMonedaPrima.val(solicitud.TipoMonedaPrima);
                base.txtMontoPrima.val(solicitud.MontoPrima);
                base.cmbTipoDocumento.val(solicitud.TipoDocumento);
                base.txtNumeroDocumento.val(solicitud.NumeroDocumento);
                base.datepickerFechaDevenge.datepicker('setDate', solicitud.FechaDevengue);
                base.datepickerFechaCotizacion.datepicker('setDate', solicitud.FechaCotizacion);
                base.cmbModalidad.val(solicitud.CodigoModalidadVenta);
                base.datepickerFechaTipoCambio.datepicker('setDate', solicitud.FechaTipoCambio);
                base.txtTipoCambio.val(solicitud.TipoCambio);
                base.cmbAsesor.val(solicitud.CodigoAsesor);
                base.txtEstado = solicitud.Estado //HND(PBH) P02190 DS-06518 2017/05/15

                base.tabBeneficiarios.grdBeneficiarios.jqGrid('clearGridData');
                base.tabModalidades.grdModalidades.jqGrid('clearGridData');
                base.tabResumen.grdResumen.jqGrid('clearGridData');

                base.tabBeneficiarios.grdBeneficiarios.jqGrid('setGridParam', { datatype: 'local', data: solicitud.Beneficiarios }).trigger('reloadGrid');
                base.tabModalidades.grdModalidades.jqGrid('setGridParam', { datatype: 'local', data: solicitud.Modalidades }).trigger('reloadGrid');
                base.tabResumen.grdResumen.jqGrid('setGridParam', { datatype: 'local', data: solicitud.Cotizaciones }).trigger('reloadGrid');
            } else {
                base.datepickerFechaTipoCambio.datepicker('setDate', window.AppConfig.fechaTipoCambio);
                base.txtTipoCambio.val(window.AppConfig.tipoCambio);
            }
            base.Controller.HabilitarControles(solicitud);
        };
        this.frmMensaje = $('#frmMensaje');
        this.frmMensaje.eventos = {
            MostrarMensaje: function (tipo, titulo, mensaje, botones) {
                base.frmMensaje.find('.modal-footer').css('display', 'none');
                base.frmMensaje.find('#iconFrmMensaje').removeClass('glyphicon-exclamation-sign');
                base.frmMensaje.find('#iconFrmMensaje').removeClass('glyphicon-question-sign');
                base.frmMensaje.find('#iconFrmMensaje').removeClass('glyphicon-ok-sign');
                base.frmMensaje.find('#iconFrmMensaje').removeClass('glyphicon-remove-sign');
                base.frmMensaje.find('#btn1FrmMensaje').off('click');
                base.frmMensaje.find('#btn2FrmMensaje').off('click');
                botones = botones || {};
                botones.btn1Text = botones.btn1Text || 'Sí';
                botones.btn2Text = botones.btn2Text || 'No';
                botones.onClickBtn1 = botones.onClickBtn1 || function () { };
                botones.onClickBtn2 = botones.onClickBtn2 || function () { base.frmMensaje.modal('hide'); };

                base.frmMensaje.find('#frmMensajeTitulo').html(titulo)
                base.frmMensaje.find('#frmMensajeContenido').html(mensaje)
                switch (tipo) {
                    case 0://Warning
                        base.frmMensaje.find('.modal-header').css('background-color', '#fcf8e3');
                        base.frmMensaje.find('#iconFrmMensaje').addClass('glyphicon-exclamation-sign');
                        base.frmMensaje.find('#iconFrmMensaje').css('color', '#8a6d3b');
                        break;
                    case 1: //Question
                        base.frmMensaje.find('.modal-header').css('background-color', '#d9edf7');
                        base.frmMensaje.find('.modal-footer').css('display', 'block');
                        base.frmMensaje.find('#btn1FrmMensaje').text(botones.btn1Text);
                        base.frmMensaje.find('#btn2FrmMensaje').text(botones.btn2Text);
                        base.frmMensaje.find('#btn1FrmMensaje').on('click', botones.onClickBtn1);
                        base.frmMensaje.find('#btn2FrmMensaje').on('click', botones.onClickBtn2);
                        base.frmMensaje.find('#iconFrmMensaje').addClass('glyphicon-question-sign');
                        base.frmMensaje.find('#iconFrmMensaje').css('color', '#31708f');
                        break;
                    case 2://Success
                        base.frmMensaje.find('.modal-header').css('background-color', '#dff0d8');
                        base.frmMensaje.find('#iconFrmMensaje').addClass('glyphicon-ok-sign');
                        base.frmMensaje.find('#iconFrmMensaje').css('color', '#3c763d');
                        break;
                    case 3://Error
                        base.frmMensaje.find('.modal-header').css('background-color', '#f2dede');
                        base.frmMensaje.find('#iconFrmMensaje').addClass('glyphicon-remove-sign');
                        base.frmMensaje.find('#iconFrmMensaje').css('color', '#a94442');
                        break;
                    default:
                        base.frmMensaje.find('.modal-header').css('background-color', 'transparent');
                };
                base.frmMensaje.modal({ show: true });
            }
        };
        this.notificacionSolicitud = $('#solicitud-notificacion');
        this.notificacionSolicitudMensaje = $('#solicitud-notificacion-mensaje');
        this.notificacionSolicitudClose = $('#solicitud-notificacion-close');
        this.notificacionSolicitud.eventos = {
            Evaluar: function (solicitud) {
                //debugger;  

                if (solicitud.NumeroSolicitud != 0 && base.btnGrabar.text() == 'Editar') {
                    base.notificacionSolicitudMensaje.html('<b>Modo Cotización</b>. Para habilitar los cambios a la Solicitud de click en el botón <b>Editar</b>.');
                    base.notificacionSolicitud.show();
                    base.estado = estadoPantalla.ReadOnly;
                }
                else {
                    base.notificacionSolicitud.hide();
                    base.estado = estadoPantalla.Editable;
                }

                //HND(PBH) P02190 DS-06518 2017/05/15 INICIO
                if (solicitud.Estado != 3 && base.btnGrabar.text() == 'Editar') {
                    base.notificacionSolicitudMensaje.html('<b>Solo Lectura</b>. Esta es una Solicitud Aprobada , no se podra realizar ninguna modificacion .');
                    $('#btnGrabar').prop('disabled', true);
                    $('#btnCotizacionDeshacer').prop('disabled', true);
                    $('#btnModObjetivo').prop('disabled', true);
                    $('#btnCotizar').prop('disabled', true);
                }
                //HND(PBH) P02190 DS-06518 2017/05/15 FIN
            }
        };
        this.eventos = {
            Init: function () {
                base.eventos.txtNumeroSolicitudInit();
                base.eventos.txtNumeroGrupoInit();
                base.eventos.cmbTipoMonedaPrimaInit();
                base.eventos.cmbTipoDocumentoInit();
                base.eventos.cmbModalidadInit();
                base.eventos.cmbAsesorInit();
                base.eventos.datepickerFechaDevengeInit();
                base.eventos.datepickerFechaCotizacionInit();
                base.eventos.datepickerFechaTipoCambioInit();
                base.eventos.txtTipoCambioInit();
                base.tabBeneficiarios.eventos.Init();
                base.tabModalidades.eventos.Init();
                base.tabResumen.eventos.Init();
            },
            txtNumeroSolicitudInit: function () {
                base.txtNumeroSolicitud.prop('disabled', true);
            },
            txtNumeroGrupoInit: function () {

            },
            cmbTipoMonedaPrimaInit: function () {
                base.cmbTipoMonedaPrima.val('S');
            },
            cmbTipoDocumentoInit: function () {
                base.cmbTipoDocumento.val('DNI');
            },
            cmbModalidadInit: function () {
                base.cmbModalidad.val('VSP');
            },
            cmbAsesorInit: function () {
                //debugger;
                var usuarioAsesor = base.cmbAsesor.find("option[data-esusuariosesion='True']");
                if (usuarioAsesor.length > 0) {
                    base.cmbAsesor.val(usuarioAsesor.val());
                }
            },
            datepickerFechaDevengeInit: function () {
                base.datepickerFechaDevenge.datepicker({ format: "dd/mm/yyyy", autoclose: true, language: "es", startDate: "01/01/1900" });
                base.datepickerFechaDevenge.datepicker('setDate', new Date());
            },
            datepickerFechaCotizacionInit: function () {
                base.datepickerFechaCotizacion.datepicker({ format: "dd/mm/yyyy", autoclose: true, language: "es", startDate: "01/01/1900" });
                base.datepickerFechaCotizacion.datepicker('setDate', new Date());
            },
            datepickerFechaTipoCambioInit: function () {
                base.datepickerFechaTipoCambio.datepicker({ format: "dd/mm/yyyy", autoclose: true, language: "es", startDate: "01/01/1900" });
                base.datepickerFechaTipoCambio.datepicker('setDate', new Date());
                base.datepickerFechaTipoCambio.datepicker('option').on('changeDate', function (e) {
                    var fecha = base.datepickerFechaTipoCambio.datepicker('getDate').toISOString();
                    var loader = new base.Helpers.windowLoadig();
                    loader.show({ titulo: 'Solicitud Particular', contenido: 'Obteniendo Tipo de Cambio' });
                    $.ajax({
                        type: 'POST',
                        url: window.rootPath + 'SolicitudParticular/ObtenerTipoCambio',
                        ContentType: "application/json; charset=utf-8",
                        data: { fechaTipoCambio: fecha },
                        success: function (tipoCambioServer) {
                            base.txtTipoCambio.val(tipoCambioServer);
                        },
                        error: function (data) {
                            base.frmMensaje.eventos.MostrarMensaje(3, 'Solicitud Particular', '<ul><li>Ocurrió un error al obtener el tipo de cambio</li></ul>');
                        },
                        complete: function () {
                            loader.hide();
                        }
                    });
                });
            },
            txtTipoCambioInit: function () {
                base.txtTipoCambio.prop('disabled', true);
            },
            _selfOnBeforeClose: function (e) {
                if (e.namespace == 'bs.modal' && e.target.id != 'valUsu' && e.target.id != 'modalModObjetivo') { //HND(AMQ) P02190 DS-06518 (DA) 2017/05/08 se añade la validación que omite los model de Modificación Objetivo
                    if (!base._self.cerrar) {
                        e.preventDefault();
                        e.stopImmediatePropagation();
                        base._self.cerrar = false;
                        base.frmMensaje.eventos.MostrarMensaje(1, 'Solicitud Particular', '<ul><li>¿Esta seguro de salir de la pantalla?</li><ul>', {
                            onClickBtn1: function () {
                                base.frmMensaje.modal('hide');
                                base._self.cerrar = true;
                                base._self.off('hide.bs.modal');
                                base._self.modal('hide');
                                base._self.find('#NuevaSolicitudModal').html('');
                            }
                        });
                        return false;
                    }
                }
            },
            btnCotizarOnClick: function () {
                var solicitud = base.ObtenerModelo();
                if (base.Validaciones.ExisteCotizacionesSinCalcular(solicitud)) {
                    var loader = new base.Helpers.windowLoadig();
                    loader.show({ titulo: 'Solicitud Particular', contenido: 'Cotizando solicitud' });
                    $.ajax({
                        type: 'POST',
                        url: window.rootPath + 'SolicitudParticular/CotizarSolicitud',
                        ContentType: "application/json; charset=utf-8",
                        data: { numeroSolicitud: solicitud.NumeroSolicitud },
                        success: function (solicitudServer) {
                            //debugger;
                            base.btnGrabar.text('Grabar');
                            base.AsignarModelo(base.Helpers.ConvertDateStringToDate(solicitudServer));
                            base.frmMensaje.eventos.MostrarMensaje(2, 'Solicitud Particular', '<ul><li>Se cotizó correctamente la solicitud</li></ul>');
                            base.tabResumen._link.tab('show');
                        },
                        error: function (data) {
                            base.frmMensaje.eventos.MostrarMensaje(3, 'Solicitud Particular', '<ul><li>Ocurrió un error al cotizar la solicitud</li></ul>');
                        },
                        complete: function () {
                            loader.hide();
                        }
                    });
                } else {
                    base.frmMensaje.eventos.MostrarMensaje(0, 'Solicitud Particular', '<ul><li>No existen cotizaciones pendientes de calculo</li></ul>');
                }
            },
            btnGrabarOnClick: function () {
                var solicitud = base.ObtenerModelo();
                //debugger;
                if (base.btnGrabar.text() == 'Editar') {
                    if (base.Validaciones.ExisteCotizacionesCalculadas(solicitud)) {
                        base.frmMensaje.eventos.MostrarMensaje(1, 'Solicitud Particular', '<ul><li>Si continua con la edición, se desharán las cotizaciones que se hayan calculado previamente. ¿Desea continuar con la edición?</li><ul>', {
                            onClickBtn1: function () {
                                //debugger;
                                var numeroCotizaciones = solicitud.Cotizaciones.map(function (o) { return o.NumeroCotizacion; });
                                var loader = new base.Helpers.windowLoadig();
                                loader.show({ titulo: 'Solicitud Particular', contenido: 'Deshaciendo cotizaciones de solicitud' });
                                $.ajax({
                                    type: 'POST',
                                    url: window.rootPath + 'SolicitudParticular/DeshacerCotizacionesSolicitud',
                                    ContentType: "application/json; charset=utf-8",
                                    data: { numeroSolicitud: solicitud.NumeroSolicitud, numeroGrupo: solicitud.NumeroGrupo, numeroCotizaciones: numeroCotizaciones },
                                    success: function (solicitudServer) {
                                        base.btnGrabar.text('Editar');
                                        base.AsignarModelo(base.Helpers.ConvertDateStringToDate(solicitudServer));
                                        base.frmMensaje.eventos.MostrarMensaje(2, 'Solicitud Particular', '<ul><li>Se deshacieron correctamente las cotizaciones de la solicitud</li></ul>');
                                        base.notificacionSolicitud.eventos.Evaluar(solicitudServer);
                                    },
                                    error: function (data) {
                                        base.frmMensaje.eventos.MostrarMensaje(3, 'Solicitud Particular', '<ul><li>Ocurrió un error al deshacer las cotizotizaciones de la solicitud</li></ul>');
                                    },
                                    complete: function () {
                                        loader.hide();
                                    }
                                });
                            }
                        });
                    } else {
                        base.Controller.HabilitarControles(solicitud);
                        base.notificacionSolicitud.eventos.Evaluar(solicitud);
                    }
                } else {
                    if (base.Validaciones.ValidarSolicitud(solicitud)) {
                        var loader = new base.Helpers.windowLoadig();
                        loader.show({ titulo: 'Solicitud Particular', contenido: 'Grabando solicitud' });
                        $.ajax({
                            type: 'POST',
                            url: window.rootPath + 'SolicitudParticular/GrabarSolicitud',
                            ContentType: "application/json; charset=utf-8",
                            data: solicitud,
                            success: function (solicitudServer) {
                                //debugger;
                                base.AsignarModelo(base.Helpers.ConvertDateStringToDate(solicitudServer));
                                base.frmMensaje.eventos.MostrarMensaje(2, 'Solicitud Particular', '<ul><li>Se grabó correctamente la solicitud</li></ul>');
                                base.notificacionSolicitud.eventos.Evaluar(solicitudServer);
                            },
                            error: function (data) {
                                //debugger;
                                base.frmMensaje.eventos.MostrarMensaje(3, 'Solicitud Particular', '<ul><li>Ocurrió un error al grabar la solicitud</li></ul>');
                            },
                            complete: function () {
                                loader.hide();
                            }
                        });
                    }
                }
            },
            btnCloseNotificacionOnClick: function () {
                base.notificacionSolicitud.hide();
            }
        };
        this.Validaciones = {
            ValidarSolicitud: function (solicitud) {
                var validacionesOK = true;
                var excepciones = ['CUSPP', 'NumeroSolicitud', 'NumeroGrupo', 'Estado']; //HND(PBH) P02190 DS-06518 2017/05/15
                var mensaje = '<ul>';
                var regExCuspp = /^[\d]{6}[A-Z]{5}[\d]{1}$/g;
                var montoPrimaMaximaSoles = Math.pow(10, 9); //1,000,000,000.00
                var monedaDolar = 'D';

                if (base.Helpers.tieneValoresVacios(solicitud, excepciones).length > 0) {
                    validacionesOK = false;
                    mensaje += '<li>Todos los campos son obligatorios a excepcion del CUSPP</li>';
                }

                if (!(Object.prototype.toString.call(solicitud.Beneficiarios) === '[object Array]' && solicitud.Beneficiarios.length > 0)) {
                    validacionesOK = false;
                    mensaje += '<li>Se debe ingresar por lo menos un beneficiario</li>';
                }

                if (!(Object.prototype.toString.call(solicitud.Modalidades) === '[object Array]' && solicitud.Modalidades.length > 0)) {
                    validacionesOK = false;
                    mensaje += '<li>Se debe ingresar por lo menos una modalidad</li>';
                }
                //Validaciones finales (solo si todo esta OK)
                if (validacionesOK) {
                    if ($.trim(base.txtCUSPP.val()) != '' && !regExCuspp.test(base.txtCUSPP.val())) {
                        validacionesOK = false;
                        mensaje += '<li>CUSPP no es válido.</li>';
                    }

                    if (!base.Helpers.esNumeroValido(base.txtMontoPrima.val())) {
                        validacionesOK = false;
                        mensaje += '<li>El Monto Prima no es válido.</li>';
                    } else {
                        if (base.txtMontoPrima.val() <= 0) {
                            validacionesOK = false;
                            mensaje += '<li>Se debe ingresar una Prima mayor a cero (0).</li>';
                        }
                        if (base.txtMontoPrima.val() >= montoPrimaMaximaSoles && base.cmbTipoMonedaPrima.val() != monedaDolar) {
                            validacionesOK = false;
                            mensaje += '<li>La Prima ingresada debe ser menor a S/ ' + montoPrimaMaximaSoles.toString() + ' o su equivalente en dólares.</li>';
                        }

                        if (base.cmbTipoMonedaPrima.val() == monedaDolar && base.txtTipoCambio.val() > 0) {
                            if (base.txtMontoPrima.val() >= Math.round((montoPrimaMaximaSoles / base.txtTipoCambio.val())*100)/100) {
                                validacionesOK = false;
                                mensaje += '<li>La Prima ingresada debe ser menor a S/ ' + montoPrimaMaximaSoles.toString() + ' o su equivalente en dólares.</li>';
                            }
                        }
                    }

                    if (base.txtTipoCambio.val() <= 0) {
                        validacionesOK = false;
                        mensaje += '<li>Se debe seleccionar una fecha con Tipo de Cambio válido.</li>';
                    }
                }

                mensaje += '</ul>';
                if (!validacionesOK) {
                    base.frmMensaje.eventos.MostrarMensaje(0, 'Solicitud Particular', mensaje);
                }
                return validacionesOK;
            },
            ExisteCotizacionesCalculadas: function (solicitud) {
                var existeCotizacionesCalculadas = false;
                if (solicitud.Cotizaciones && solicitud.Cotizaciones.length > 0) {
                    for (var i = 0; i < solicitud.Cotizaciones.length; i++) {
                        if (solicitud.Cotizaciones[i].CodigoEstado != 1) {
                            existeCotizacionesCalculadas = true;
                            break;
                        }
                    }
                }
                return existeCotizacionesCalculadas;
            },
            ExisteCotizacionesSinCalcular: function (solicitud) {
                var existeCotizacionesSinCalcular = false;
                if (solicitud.Cotizaciones && solicitud.Cotizaciones.length > 0) {
                    for (var i = 0; i < solicitud.Cotizaciones.length; i++) {
                        if (solicitud.Cotizaciones[i].CodigoEstado == 1) {
                            existeCotizacionesSinCalcular = true;
                            break;
                        }
                    }
                }
                return existeCotizacionesSinCalcular;
            },
            ExisteCotizacionesCalculadasAceptadas: function (solicitud) {
                var existeCotizacionesSinCalcular = false;
                if (solicitud.Cotizaciones && solicitud.Cotizaciones.length > 0) {
                    for (var i = 0; i < solicitud.Cotizaciones.length; i++) {
                        if (solicitud.Cotizaciones[i].CodigoEstado == 2) {
                            existeCotizacionesSinCalcular = true;
                            break;
                        }
                    }
                }
                return existeCotizacionesSinCalcular;
            }
        };
        this.AsociarEventos = function () {
            base.btnGrabar.on('click', base.eventos.btnGrabarOnClick);
            base.btnCotizar.on('click', base.eventos.btnCotizarOnClick)
            base.tabModalidades.cmbProductoModalidad.on('change', base.tabModalidades.eventos.cmbProductoModalidadOnChange);
            base.tabModalidades.cmbAniosTemporalModalidad.on('change', base.tabModalidades.eventos.cmbAniosTemporalModalidadOnChange);
            base.tabModalidades.chkPeriodoGarantizadoModalidad.on('change', base.tabModalidades.eventos.chkPeriodoGarantizadoModalidadOnChange);
            base.tabModalidades.chkDevolucionPrimaModalidad.on('change', base.tabModalidades.eventos.chkDevolucionPrimaModalidadOnChange);
            base.tabBeneficiarios.btnAgregarBeneficiario.on('click', base.tabBeneficiarios.eventos.btnAgregarBeneficiarioOnClick)
            base.tabBeneficiarios.btnEliminarBeneficiario.on('click', base.tabBeneficiarios.eventos.btnEliminarBeneficiarioOnClick);
            base.tabModalidades.btnAgregarModalidad.on('click', base.tabModalidades.eventos.btnAgregarModalidadOnClick);
            base.tabModalidades.btnEliminarModalidad.on('click', base.tabModalidades.eventos.btnEliminarModalidadOnClick);
            base.tabResumen.btnEvaluacionFin.on('click', base.tabResumen.eventos.btnEvaluacionFinOnClick);//HND(AMQ) P02190 DS-06518 (DA) 2017-05-03 boton reporte Evaluación Financiera
            base.tabResumen.btnCartaOficial.on('click', base.tabResumen.eventos.btnCartaOficialOnClick);//HND(AMQ) P02190 DS-06518 (DA) 2017-05-03 boton reporte Carta Oficial de Cotización
            base.tabResumen.btnModObjetivo.on('click', base.tabResumen.eventos.btnModObjetivoOnClick);//HND(AMQ) P02190 DS-06518 (DA) 2017-05-03 boton reporte Carta Oficial de Cotización
            base.tabResumen.btnModObjetivoVal.on('click', base.tabResumen.eventos.btnModObjetivoValOnClick);//HND(AMQ) P02190 DS-06518 (DA) 2017-05-03 boton reporte Carta Oficial de Cotización       
            base.tabResumen.btnModObjCerrar.on('click', base.tabResumen.eventos.btnModObjCerrarOnClick);//HND(AMQ) P02190 DS-06518 (DA) 2017-05-03 boton cerrar validación credenciales       

            base.tabResumen.btnCotizacionDeshacer.on('click', base.tabResumen.eventos.btnCotizacionDeshacerOnClick);
            base.tabResumen.btnCotizacionResumen.on('click', base.tabResumen.eventos.btnCotizacionResumenOnClick)
            base.tabResumen._link.on('click', base.tabResumen._linkOnClick);
            base.notificacionSolicitudClose.on('click', base.eventos.btnCloseNotificacionOnClick);


            //Al cerrar la ventana se deben eliminar las asociasiones de nivel superior
            base._self.on('hide.bs.modal', base.eventos._selfOnBeforeClose);
        };
        this.InitComponent = function () {
            base.eventos.Init();
        };
        this.Controller = {
            CargarSolicitud: function (solicitud) {
                base.AsignarModelo(solicitud);
                base.solicitudOriginal = base.ObtenerModelo();
                base.Controller.asignarSeguimiento();
                base.Controller.VerificarPerfilUsuario();
                base.notificacionSolicitud.eventos.Evaluar(solicitud);
            },
            VerificarPerfilUsuario: function () {
                debugger;
                //Verificar asesor, si se encuentra en lista de asesores es Fuerza de Venta
                var usuarioAsesor = base.cmbAsesor.find("option[data-esusuariosesion='True']");
                if (usuarioAsesor.length > 0) {
                    //base.cmbAsesor.attr('disabled', 'disabled');//HND(PBH) P02190 DS-06518 2017/05/15
                    base.perfilUsuario = perfilUsuario.FuerzaVenta;
                } else {
                    base.perfilUsuario = perfilUsuario.Administrativo;
                }

                //Para la Fuerza de venta no se muestra TIR
                if (base.perfilUsuario == perfilUsuario.FuerzaVenta) {
                    base.tabResumen.grdResumen.hideCol("TIR");
                }
            },
            HabilitarControles: function (solicitud) {

                var deshabilitar = false;
                var PermisoCambiarFechaCotizacion = $('input#PermisoCambiarFechaCotizacion').val();  //HND(PBH) P02190 DS-06518 2017/05/11
                var PermisoCambiarAsesorSolicitud = $('input#PermisoCambiarAsesorSolicitud').val();  //HND(PBH) P02190 DS-06518 2017/05/11

                if (solicitud.NumeroSolicitud != 0) {
                    if (base.btnGrabar.text() == 'Editar') {
                        base.btnGrabar.text('Grabar');
                        deshabilitar = false;
                    } else {
                        base.btnGrabar.text('Editar');
                        deshabilitar = true;
                    }
                } else {
                    base.btnGrabar.text('Grabar');
                    deshabilitar = false;
                }


                base.btnCotizar.prop('disabled', !deshabilitar);
                base.tabResumen.btnCotizacionDeshacer.prop('disabled', !deshabilitar);
                //base.tabResumen.btnEvaluacionFin.prop('disabled', !deshabilitar); //HND (AMQ)

                base.txtCUSPP.prop('disabled', deshabilitar);
                base.cmbTipoMonedaPrima.prop('disabled', deshabilitar);
                base.txtMontoPrima.prop('disabled', deshabilitar);
                base.txtAsegurado.prop('disabled', deshabilitar);
                base.cmbTipoDocumento.prop('disabled', deshabilitar);
                base.txtNumeroDocumento.prop('disabled', deshabilitar);
                base.txtFechaDevenge.prop('disabled', deshabilitar);
                base.datepickerFechaDevenge.datepicker('option', 'disabled', deshabilitar);
                base.txtFechaCotizacion.prop('disabled', PermisoCambiarFechaCotizacion == "si" ? deshabilitar : true);  //HND(PBH) P02190 DS-06518 2017/05/11               
                base.datepickerFechaCotizacion.datepicker('option', 'disabled', deshabilitar);
                base.cmbModalidad.prop('disabled', deshabilitar);
                base.txtFechaTipoCambio.prop('disabled', deshabilitar);
                base.datepickerFechaTipoCambio.datepicker('option', 'disabled', deshabilitar);
                base.cmbAsesor.prop('disabled', PermisoCambiarAsesorSolicitud == "si" ? deshabilitar : true); //HND(PBH) P02190 DS-06518 2017/05/11 

                base.tabBeneficiarios.cmbSexoBeneficiario.prop('disabled', deshabilitar);
                base.tabBeneficiarios.txtDatepickerFechaNacimientoBeneficiario.prop('disabled', deshabilitar);
                base.tabBeneficiarios.datepickerFechaNacimientoBeneficiario.datepicker('option', 'disabled', deshabilitar);
                base.tabBeneficiarios.cmbCondicionBeneficiario.prop('disabled', deshabilitar);
                base.tabBeneficiarios.cmbInvalidoPVBeneficiario.prop('disabled', deshabilitar);
                base.tabBeneficiarios.btnAgregarBeneficiario.prop('disabled', deshabilitar);
                base.tabBeneficiarios.btnEliminarBeneficiario.prop('disabled', deshabilitar);

                base.tabModalidades.cmbProductoModalidad.prop('disabled', deshabilitar);
                base.tabModalidades.chkPeriodoGarantizadoModalidad.prop('disabled', deshabilitar);
                base.tabModalidades.cmbPeriodoGarantizadoModalidad.prop('disabled', deshabilitar);
                base.tabModalidades.cmbTipoMonedaModalidad.prop('disabled', deshabilitar);
                base.tabModalidades.chkDevolucionPrimaModalidad.prop('disabled', deshabilitar);
                base.tabModalidades.cmbDevolucionPrimaModalidad.prop('disabled', deshabilitar);
                base.tabModalidades.cmbAniosTemporalModalidad.prop('disabled', deshabilitar);
                base.tabModalidades.chkReembolsoModalidad.prop('disabled', deshabilitar);
                base.tabModalidades.cmbSegundoTramoModalidad.prop('disabled', deshabilitar);
                base.tabModalidades.btnAgregarModalidad.prop('disabled', deshabilitar);
                base.tabModalidades.btnEliminarModalidad.prop('disabled', deshabilitar);

                /*Mostrar controles por producto*/
                base.tabModalidades.cmbProductoModalidad.trigger('change');

                /*Verificar Perfil*/
                debugger;
                base.Controller.VerificarPerfilUsuario();
            },
            asignarSeguimiento: function () {
                $('.Tracking').on('blur', function () {
                    base.Controller.verificarCambios();
                });

                $('.input-group.date.Tracking').datepicker('option').on('changeDate', function () {
                    base.Controller.verificarCambios();
                });

                $('.input-group.date.Tracking').find(':input').on('blur', function () {
                    base.Controller.verificarCambios();
                });
            },
            verificarCambios: function () {

                var solicitudActual = base.ObtenerModelo();
                if (base.Helpers.compareObjects(base.solicitudOriginal, solicitudActual)) {

                }
            }
        };
        this.Load = function () {
            base.Controller.CargarSolicitud(window.Solicitud);
        }
        this.Helpers = {
            guid: function () {
                function s4() {
                    return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
                }
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            },
            compareObjects: function (objSource, objCompare) {
                //No compara a detalle estos tipos de datos
                //Object Function
                //Object RegExp
                var primitiveObjects = ['[object String]', '[object Number]', '[object Boolean]', '[object Null]', '[object Undefined]'];
                var typeObjectSource = Object.prototype.toString.call(objSource);
                var typeObjectCompare = Object.prototype.toString.call(objCompare);

                if (typeObjectSource != typeObjectCompare) { return false; }
                if (primitiveObjects.indexOf(typeObjectSource) > -1) {
                    if (objSource !== objCompare) { return false; }
                }
                if (typeObjectSource == '[object Date]') {
                    if (objSource.getTime() != objCompare.getTime()) { return false; }
                }
                if (typeObjectSource == '[object Array]') {
                    if (objSource.length != objCompare.length) { return false; }
                    if (objSource.length > 0) {
                        var r = true;
                        for (var i = 0; i < objSource.length; i++) {
                            if (!base.Helpers.compareObjects(objSource[i], objCompare[i])) { r = false; break; };
                        }
                        if (!r) { return false; }
                    }
                }

                if (typeObjectSource == '[object Object]') {
                    var res = true;
                    for (var key in objSource) {
                        var typeSource = Object.prototype.toString.call(objSource[key]);
                        var typeCompare = Object.prototype.toString.call(objCompare[key]);

                        if (typeSource != typeCompare) { res = false; break; }

                        if (primitiveObjects.indexOf(typeSource) > -1) {
                            if (objSource[key] !== objCompare[key]) { res = false; break; }
                        }

                        if (typeSource == '[object Date]') {
                            if (objSource[key].getTime() !== objCompare[key].getTime()) { res = false; break; }
                        }

                        if (typeSource == '[object Object]') {
                            if (!base.Helpers.compareObjects(objSource[key], objCompare[key])) { res = false; break; }
                        }

                        if (typeSource == '[object Array]') {
                            if (objSource[key].length != objCompare[key].length) { res = false; break; }
                            if (objSource[key].length > 0) {
                                var r = true;
                                for (var i = 0; i < objSource[key].length; i++) {
                                    if (!base.Helpers.compareObjects(objSource[key][i], objCompare[key][i])) { r = false; break; };
                                }
                                if (!r) { res = false; break; }
                            }
                        }
                    }

                    return res;
                }
            },
            tieneValoresVacios: function (entidad, excepciones) {
                var camposVacios = new Array();

                excepciones = excepciones || [];

                for (var key in entidad) {
                    if (excepciones.indexOf(key) == -1) {
                        if (entidad[key] == null || entidad[key] == undefined || entidad[key] === '') {
                            camposVacios.push(key);
                        }
                    }
                }

                return camposVacios;
            },
            esNumeroValido: function (valor) {
                //return $.isNumeric(valor);
                var pattern = /^(\d+(?:[\.\,]\d{2})?)$/;
                return pattern.test(valor);
            },
            ConvertDateToISOString: function (obj) {
                var typeObj = Object.prototype.toString.call(obj);

                if (typeObj == '[object Date]') {
                    obj = obj.toISOString();
                }

                if (typeObj == '[object Array]') {
                    for (var i = 0; i < obj.length; i++) {
                        obj[i] = base.Helpers.ConvertDateToISOString(obj[i]);
                    }
                }

                if (typeObj == '[object Object]') {
                    for (var key in obj) {
                        obj[key] = base.Helpers.ConvertDateToISOString(obj[key]);
                    }
                }
                return obj;
            },
            ConvertDateStringToDate: function (obj) {
                var typeObj = Object.prototype.toString.call(obj);

                if (typeObj == '[object String]' && obj.indexOf('/Date(') == 0) {
                    obj = new Date(parseFloat(obj.replace('/Date(', '').replace(')/', '')));
                }

                if (typeObj == '[object Array]') {
                    for (var i = 0; i < obj.length; i++) {
                        obj[i] = base.Helpers.ConvertDateStringToDate(obj[i]);
                    }
                }

                if (typeObj == '[object Object]') {
                    for (var key in obj) {
                        obj[key] = base.Helpers.ConvertDateStringToDate(obj[key]);
                    }
                }
                return obj;
            },
            windowLoadig: function (config) {
                var wl = this;
                var body = $('body');
                config = config || {};

                this.windows = '';
                this.id = base.Helpers.guid();
                this.titulo = config.titulo || '';
                this.contenido = config.contenido || '';
                this.getHTML = function () {
                    wl.windows = '';
                    wl.windows += '<div class="modal fade" tabindex="-1" role="dialog" id="' + wl.id + '">';
                    wl.windows += '    <div class="modal-dialog modal-sm" role="document">';
                    wl.windows += '        <div class="modal-content">';
                    //wl.windows += '            <div class="modal-header">';
                    //wl.windows += '                <button type="button" class="close" data-dismiss="modal" aria-label="close">';
                    //wl.windows += '                    <span aria-hidden="true">&times;</span>';
                    //wl.windows += '                </button>';
                    //wl.windows += '                <h4 class="modal-title"><span>' + wl.titulo + '</span></h4>';
                    //wl.windows += '            </div>';
                    wl.windows += '            <div class="modal-body">';
                    wl.windows += '               <div class="row">';
                    wl.windows += '                   <div class="col-sm-1" ><div class="loader"></div></div>';
                    wl.windows += '                   <div class="col-sm-8">' + wl.contenido + '</div>';
                    wl.windows += '               </div>';
                    wl.windows += '            </div>';
                    //w += '            <div class="modal-footer">';
                    //w += '                 <button type="button" class="btn btn-default texto" id="btn1FrmMensaje"></button>';
                    //w += '                <button type="button" class="btn btn-default texto" id="btn2FrmMensaje"></button>';
                    //w += '            </div>';
                    wl.windows += '        </div>';
                    wl.windows += '    </div>';
                    wl.windows += '</div>';

                    return wl.windows;
                };
                this.show = function (config) {
                    wl.titulo = config.titulo || '';
                    wl.contenido = config.contenido || '';

                    $('#' + wl.id).remove();
                    body.append(wl.getHTML());
                    $('#' + wl.id).modal({
                        backdrop: 'static',
                        keyboard: false,
                        show: true
                    });
                    $('#' + wl.id).on('hidden.bs.modal', function () {
                        $('#' + wl.id).remove();
                    });
                };
                this.hide = function () {
                    $('#' + wl.id).modal('hide');
                    //                    $('#' + wl.id).remove();
                };
            }
        };
        var _constructor = function () {
            base.AsociarEventos();
            base.InitComponent();
            base.Load();
        }();
        var inputMask = new Inputmask("");
        inputMask.mask(base.txtMontoPrima);
        inputMask.mask(base.txtCUSPP);
    }
});