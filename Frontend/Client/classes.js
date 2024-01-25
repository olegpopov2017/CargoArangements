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


export class Container extends Box
{
  class_name = 'container'
  
  constructor(box_array,length,width,height,x,y,z)
  {
    super(length,width,height,x,y,z);
    this.box_array = box_array;
  }
}



//добавить к каждому бокс гуид 
//добавить к каждому бокс возможность доблять массив боксов


//возможность добавления в бокс поштучно
//возможность бобавления в бокс оптом много одинаковых.