<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\softDeletes;

class ModalidadCar extends Model
{
    use softDeletes;
    protected $dates = ['deleted_at'];
    protected $table='sene_modalidadcarrera';
    protected $fillable = [
        'id', 'etiqueta', 'id_usu_cre', 'fecha_cre', 'id_usu_mod', 'fecha_mod', 'deleted_at'
    ];
}
