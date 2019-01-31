$(document).ready(function(){
    $("#buscarAsig").hide();
});

function obtenerDatos() {
    var id_sedes = $("#id_sede option:selected").attr("data-sedes");
    var id_carrera = $("#id_carrera option:selected").attr("data-carreras");
    var id_jornada = $("#id_jornada option:selected").attr("data-jornada");
    var id_paralelo = $("#id_paralelo option:selected").attr("data-paralelos");
    var datos = [
        dato1 = {"id_sedes":id_sedes},
        dato2 = {"id_carrera":id_carrera},
        dato3 = {"id_jornada":id_jornada},
        dato4 = {"id_paralelo":id_paralelo},
        ]
    return datos;
}

function checkRb(selector) {
    //var op = $('input:radio[name='+selector+']:checked').val();
    var op = $(selector).attr('value');
    if (op == 1) {
        console.log(op);
        $("#buscarAsig").hide();
        $("#guardarAsig").show();
        $("#cont_paralelo").show();
    } 
    if(op == 2){
        console.log(op);
        $("#guardarAsig").hide();
        $("#buscarAsig").show();
        $("#cont_paralelo").hide();
    }
}

function guardarAsignacion() {

    var arreglo = obtenerDatos();
	console.log('Datos: '+arreglo[0].id_sedes+' '+arreglo[1].id_carrera+' '+arreglo[2].id_jornada+' '+arreglo[3].id_paralelo);
	if (validarCampos(arreglo[1].id_carrera,arreglo[0].id_sedes,arreglo[2].id_jornada,arreglo[3].id_paralelo)) {
        $.post(ruta_global+'/admin/asignacion/validar',{'id_carrera':arreglo[1].id_carrera,'id_sede':arreglo[0].id_sedes,'id_jornada':arreglo[2].id_jornada,'id_paralelo':arreglo[3].id_paralelo},function success(data){
            //console.info(data[0].paralelo);
            if (data[0].paralelo!=0) {
                alert('Paralelo ya registrado');
            } else {
                $.post(ruta_global+'/admin/asignacion/guardar',{'id_carrera':arreglo[1].id_carrera,'id_sede':arreglo[0].id_sedes,'id_jornada':arreglo[2].id_jornada,'id_paralelo':arreglo[3].id_paralelo},function success(data){
                    //console.log(data);
                });        
            }
        });        

        //Ponemos por defecto los selectores
        $("#id_carrera").val('0');
        $("#id_sede").val('0');
        $("#id_jornada").val('0');
        $("#id_paralelo").val('0');
	}
	else
		alert('Error');
}

function consultarAsignacion(op) {
    console.log(op);
    var arreglo = obtenerDatos();
    if (validarCampos(arreglo[1].id_carrera,arreglo[0].id_sedes,arreglo[2].id_jornada,arreglo[3].id_paralelo)) {
         $.post(ruta_global+'/admin/asignacion/paralelos',{'op':op,'id_carrera':arreglo[1].id_carrera,'id_sede':arreglo[0].id_sedes,'id_jornada':arreglo[2].id_jornada,'id_paralelo':arreglo[3].id_paralelo},function success(data){
            console.log(data);
           llenarTabla(data);
        });
    } else {}
}

function getParalelos(op){
    var id_sedes = $("#id_sede option:selected").attr("data-sedes");
    var id_carrera = $("#id_carrera option:selected").attr("data-carreras");
    var id_jornada = $("#id_jornada option:selected").attr("data-jornada");
    var arreglo = obtenerDatos();
	//console.log(id);
	headerAjax();
    $.ajax({
        url: ruta_global+'/admin/asignacion/paralelos',
        type: 'post',
        dataType: 'json',
        data:{'op':op,'id_carrera':arreglo[1].id_carrera,'id_sede':arreglo[0].id_sedes,'id_jornada':arreglo[2].id_jornada,'id_paralelo':arreglo[3].id_paralelo},
        success: function (data) {
            console.info(data);
            if (op == 1) {
                llenarTabla(data);
            } else {
                llenarCmb(data);
            }
        }
    });
}

function llenarTabla(data) {
	$("#tabla").empty();
    $.each(data, function(i, item){
        $("#tabla").append("<tr><th>"+item.id+"</th>"    +
                               "<th>"+item.nombre_paralelo+"</th></tr>");
    });
}

function llenarCmb(data) {
    $("#id_paralelo").empty();
    $("#id_paralelo").append("<option value='0' data-paralelos='0'>--Seleccione--</option>");
    $.each(data,function(i,item){
        $("#id_paralelo").append("<option value='"+item.id+"' data-paralelos='"+item.id+"'>"+item.nombre_paralelo+"</option>");
    });
}

function validarCampos(id_carrera,id_sede,id_jornada,id_paralelo) {
    if((id_carrera && id_carrera.lenght !== 0) && (id_sede && id_sede.lenght !== 0) && (id_jornada && id_jornada.lenght !== 0) && (id_paralelo && id_paralelo.lenght !== 0))
        return true;
    else
        return false;   
}

function headerAjax(){
	$.ajaxSetup({
  		headers: {
    		'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
  		}
	});
}