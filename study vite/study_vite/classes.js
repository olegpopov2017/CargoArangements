export class Box
{
  class_name = 'box';
  uuid = 0;
  inner_objects; //Array of inner objects.
  
  constructor(length,width,height,x,y,z,inner_objects) 
  {
    this.inner_objects = inner_objects
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

export class Cuboid
{
  uuid
  
  constructor(length_X,width_Y,height_Z,x,y,z) 
  {
    this.array_of_inner_objects = [];
    this.length_X = length_X;
    this.width_Y = width_Y;
    this.height_Z = height_Z;    
    this.x = x;
    this.y = y;
    this.z = z;
  }
  array_of_inner_objects
  array_of_outer_objects
} 

