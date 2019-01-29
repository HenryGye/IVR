@extends('layouts.principal')
@section('content')
<div id="content-wrapper">
    <div class="container-fluid">
        	<div class="row">        		
				<div class="col-md-4">
					{!! Form::model($editarfinanbeca,['route' => ['financiamientobeca.update',$editarfinanbeca->id],'method'=>'PUT']) !!}
        				<div class="card mb-3">
				            <div class="card-header">
				              <i class="fas fa-table"></i>
				              Tipo de financiamiento de la beca</div>
				            <div class="card-body">
				              	<label>Etiqueta</label>
					    		{!!Form::text('etiqueta',null,['class'=>'form-control'])!!}
					    		<button class="btn btn-warning btn-block mt-3">Editar</button>
								{!! Form::close() !!}
								@include('mensaje.mensajeerror')			           
				            </div>
		          		</div>  <!--fin del card-3 -->		          	
        		</div>
        	</div>
	</div>
</div>
@endsection