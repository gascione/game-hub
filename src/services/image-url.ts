import noImage from "../assets/no-image-placeholder.jpeg";

//esta funcion agarra la url original y devuelve otra pero modificada, con la opcion crop xa que sea mas pequeña la imagen
const getCroppedImageUrl = (url: string) => {
  if (!url) return noImage;
  //buscamos la parte que dice media
  //indexOf nos devuelve el index donde empieza lo que buscamos entonces agregamos el valor del lenght de media/, asi podemos agregar en el numero correcto crop
  //como repetimos muchas veces media/, hacemos una variable a parte xa q sea + prolijo
  const target = "media/";
  const index = url.indexOf(target) + target.length;
  //cortamos la url desde el 0 hasta el index, agregamos lo q queremos y despues agregamos el resto de la url que nos quedaba
  return url.slice(0, index) + "crop/600/400/" + url.slice(index);
};

export default getCroppedImageUrl;
