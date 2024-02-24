export class Box
{
  class_name = 'box';
  guid = 0;
  
  constructor(length,width,height,x,y,z) 
  {
    this.length = length;
    this.width = width;
    this.height = height;    
    this.x = x;
    this.y = y;
    this.z = z;
  }
};


export class Palette
{
  class_name = 'Palette'
  constructor(lenght_palette,width_palette,height_palette)
  {
    this.lenght_palette = lenght_palette;
    this.width_palette = width_palette;
    this.height_palette = height_palette;
  }
}


export class Container extends Box
{
  class_name = 'container'
  
  constructor(box_array,length,width,height,x,y,z)
  {
    super(length,width,height,x,y,z);
    this.box_array = box_array;
  }
}



class Cuboid
{
  class_name = 'Cuboid';
  
  cuboid_type = 

  inner_object = bool;
  have_parent = bool;
  
  constructor(length,width,height,x,y,z,guid) 
  {
    this.length = length;
    this.width = width;
    this.height = height;    
    this.x = x;
    this.y = y;
    this.z = z;
    this.guid = guid;
  }
};






//добавить к каждому бокс гуид 
//добавить к каждому бокс возможность доблять массив боксов


//возможность добавления в бокс поштучно
//возможность бобавления в бокс оптом много одинаковых.