exports.ObtenerUsuarios = function(){

    console.log("Obtener Usuarios");

    let usuarios = [];

    usuarios.push({ nombre:"Samuel", id:1, activo:true });
    usuarios.push({ nombre:"Lisa", id:2, activo:true });
    usuarios.push({ nombre:"Bob", id:3, activo:true });
    usuarios.push({ nombre:"Alicia", id:4, activo:true });

    return usuarios;
};