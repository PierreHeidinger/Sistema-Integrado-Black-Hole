





$('.dt-picker').datepicker({
    format: "dd/mm/yyyy",
    autoclose: true
});

var pantalla = new ClassPantalla();

function ClassEstadoPantalla() {
    this.Lectura = 0;
    this.Editable = 1;
}

function ClassPantalla() {

    var base = this;
    

    var estadoPantalla = new ClassEstadoPantalla();
    this.estado = estadoPantalla.Lectura;
    this.txtCodigo = $('#txtCodigo');
    this.txtFechaRegistro = $('#txtFechaRegistro');
    this.txtNombre = $('#txtNombre');
    this.txtDescripcion = $('#txtDescripcion');
    this.txtDescripcionCorta = $('#txtDescripcionCorta');
    this.txtDireccion = $('#txtDireccion');
    this.txtLocalidad = $('#txtLocalidad');
    this.txtTelefono = $('#txtTelefono');
    this.txtCelular = $('#txtCelular');
    this.cboTipoHospedaje = $('#cboTipoHospedaje');
    this.btnGrabar = $('#btnGrabar');
    this.flPortada = $('#flPortada');
    this.imgPreview = $('#imgPreview');
    this.btnGuardarImagen = $('#btnGuardarImagen');
    this.ObtenerModelo = function () {
        var hospedaje = new ClassHospedaje();

        hospedaje.IdHospedaje = base.txtCodigo.val();
        hospedaje.Nombre = base.txtNombre.val();
        hospedaje.Descripcion = base.txtDescripcion.val();
        hospedaje.DescripcionCorta = base.txtDescripcionCorta.val();
        hospedaje.Direccion = base.txtDireccion.val();
        hospedaje.Localidad = base.txtLocalidad.val();
        hospedaje.Telefono = base.txtTelefono.val();
        hospedaje.Celular = base.txtCelular.val();
        hospedaje.TipoHospedaje = base.cboTipoHospedaje.find('option:selected').val();
        hospedaje.UrlPortada = base.flPortada.val();

        return hospedaje;
    };
    this.AsignarModelo = function (hospedaje) {
        
        if (hospedaje.IdHospedaje != 0) {
            base.txtCodigo.val(hospedaje.IdHospedaje);
            //base.txtFechaRegistro.datepicker('setDate', hospedaje.FechaDevengue);
            base.txtNombre.val(hospedaje.Nombre);
            base.txtDescripcion.val(hospedaje.Descripcion);
            base.txtDescripcionCorta.val(hospedaje.DescripcionCorta);
            base.txtDireccion.val(hospedaje.Direccion);
            base.txtLocalidad.val(hospedaje.Localidad);
            base.txtTelefono.val(hospedaje.Telefono);
            base.txtCelular.val(hospedaje.Celular);
            base.cboTipoHospedaje.val(hospedaje.TipoHospedaje);

            base.Controller.HabilitarControles(true);
        } 
    };
    this.Alerta = {

        mostrarMensaje: function (tipo,titulo,contenido) {

            switch (tipo) {

                //SUCCESS
                case 0:
                    $.confirm({
                        title: titulo,
                        content: contenido,
                        type: 'green',
                        typeAnimated: true,
                        buttons: {
                            tryAgain: {
                                text: 'Ok',
                                btnClass: 'btn-green',
                                action: function () {
                                }
                            },
                            
                        }
                    });
                    break;
                //ERROR
                case 1:
                    $.confirm({
                        title: titulo,
                        content: contenido,
                        type: 'red',
                        typeAnimated: true,
                        buttons: {
                            tryAgain: {
                                text: 'Ok',
                                btnClass: 'btn-red',
                                action: function () {
                                }
                            },

                        }
                    });
                    break;
                //PELIGRO
                case 2:
                    $.confirm({
                        title: titulo,
                        content: contenido,
                        type: 'orange',
                        typeAnimated: true,
                        buttons: {
                            tryAgain: {
                                text: 'Ok',
                                btnClass: 'btn-red',
                                action: function () {
                                }
                            },

                        }
                    });
                    break;

            }

        }
    };
    this.validaciones = {

        ValidarHospedaje : function (hospedaje) {
            var validacionesOK = true;
            var excepciones = ['Telefono', 'IdHospedaje','UrlPortada'];
            var mensaje = '<ul>';

            if (base.Helpers.tieneValoresVacios(hospedaje, excepciones).length > 0) {
                validacionesOK = false;
                mensaje += '<li>Todos los campos son obligatorios a excepcion del Telefono.</li>';
            }

            mensaje += '</ul>';

            if (!validacionesOK) {
                base.Alerta.mostrarMensaje(2, 'Hospedaje', mensaje);
            }

            return validacionesOK;
        }
    };
    this.eventos = {

        btnGrabarOnClick: function () {
            
            var loader = new base.Helpers.windowLoadig();
            var hospedaje = base.ObtenerModelo();

            if (base.btnGrabar.text() == 'Editar') {
                base.Controller.HabilitarControles(hospedaje);              
            } else {
                if (base.validaciones.ValidarHospedaje(hospedaje)) {

                    loader.show({ titulo: 'Hospedaje', contenido: 'Grabando Hospedaje' });
                    $.ajax({

                        type: 'POST',
                        url: window.rootPath + 'Hospedaje/GrabarHospedaje',
                        ContentType: "application/json; charset=utf-8",
                        data: hospedaje,
                        success: function (hospedajeServidor) {
                            base.AsignarModelo(hospedajeServidor);
                            base.Alerta.mostrarMensaje(0, 'Hospedaje', 'Datos Guardados Exitosamente!');
                        },
                        error: function () {
                            base.Alerta.mostrarMensaje(1, 'Hospedaje', 'Ocurrio algun error ups!');
                        },
                        complete: function () {
                            loader.hide();
                        }

                    });
                }
                
            };
            

        },
        fileUploadOnChange: function () {
            debugger;
            var fReader = new FileReader();
            fReader.readAsDataURL(base.flPortada[0].files[0]);

            fReader.onloadend = function (event) {
              
                base.imgPreview.attr('src', event.target.result);
                //alert(event.target.result.split(",", 2)[1]);
            }
            
        },

    };
    this.AsociarEventos = function () {
        base.btnGrabar.on('click', base.eventos.btnGrabarOnClick);
        base.flPortada.on('change', base.eventos.fileUploadOnChange);
    };
    this.Controller = {
        CargarHospedaje: function (hospedaje) {
            base.AsignarModelo(hospedaje);
        },
        HabilitarControles: function (hospedaje) {

            var _control = false;

            if (hospedaje.IdHospedaje != 0) {
                if (base.btnGrabar.text() == 'Editar') {
                    base.btnGrabar.text('Grabar');
                    _control = false;
                } else {
                    base.btnGrabar.text('Editar');
                    _control = true;
                }
            } else {
                base.btnGrabar.text('Grabar');
                _control = false;
            }
            base.txtNombre.prop('disabled', _control);
            base.txtDescripcion.prop('disabled', _control);
            base.txtDescripcionCorta.prop('disabled', _control);
            base.txtDireccion.prop('disabled', _control);
            base.txtLocalidad.prop('disabled', _control);
            base.txtTelefono.prop('disabled', _control);
            base.txtCelular.prop('disabled', _control);
            base.cboTipoHospedaje.prop('disabled', _control);
            base.btnGuardarImagen.prop('disabled', !_control);

        }

    };
    this.Load = function () {
        base.Controller.CargarHospedaje(window.Hospedaje);
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
                wl.windows += '    <div class="modal-dialog modal-sm" style="margin-top:250px">';
                wl.windows += '        <div class="modal-content">';
                //wl.windows += '            <div class="modal-header">';
                //wl.windows += '                <button type="button" class="close" data-dismiss="modal" aria-label="close">';
                //wl.windows += '                    <span aria-hidden="true">&times;</span>';
                //wl.windows += '                </button>';
                //wl.windows += '                <h4 class="modal-title"><span>' + wl.titulo + '</span></h4>';
                //wl.windows += '            </div>';
                wl.windows += '            <div class="modal-body">';
                wl.windows += '               <div class="row"><center>';
                wl.windows += '                   <table>';
                wl.windows += '                     <tr><td><img src="' + window.rootPath + 'imagenes/Hospedaje/Cargando.gif" width="120px" /></td>';
 //               wl.windows += '                         <td><label>' + wl.contenido + '</label></td></tr>';
                wl.windows += '                   </table>';
                wl.windows += '               </center></div>';
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
        },
        tieneValoresVacios: function (entidad, excepciones) {
            debugger;
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
        }
    
    };
    var _constructor = function () {
        base.AsociarEventos();
        //base.InitComponent();
        base.Load();
    }();
}







