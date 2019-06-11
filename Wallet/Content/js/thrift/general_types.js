//
// Autogenerated by Thrift Compiler (0.11.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//


ClassObject = function(args) {
  this.byteCodeObjects = null;
  this.instance = null;
  if (args) {
    if (args.byteCodeObjects !== undefined && args.byteCodeObjects !== null) {
      this.byteCodeObjects = Thrift.copyList(args.byteCodeObjects, [null]);
    }
    if (args.instance !== undefined && args.instance !== null) {
      this.instance = args.instance;
    }
  }
};
ClassObject.prototype = {};
ClassObject.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.LIST) {
        var _size0 = 0;
        var _rtmp34;
        this.byteCodeObjects = [];
        var _etype3 = 0;
        _rtmp34 = input.readListBegin();
        _etype3 = _rtmp34.etype;
        _size0 = _rtmp34.size;
        for (var _i5 = 0; _i5 < _size0; ++_i5)
        {
          var elem6 = null;
          elem6 = new ByteCodeObject();
          elem6.read(input);
          this.byteCodeObjects.push(elem6);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.instance = input.readBinary().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ClassObject.prototype.write = function(output) {
  output.writeStructBegin('ClassObject');
  if (this.byteCodeObjects !== null && this.byteCodeObjects !== undefined) {
    output.writeFieldBegin('byteCodeObjects', Thrift.Type.LIST, 1);
    output.writeListBegin(Thrift.Type.STRUCT, this.byteCodeObjects.length);
    for (var iter7 in this.byteCodeObjects)
    {
      if (this.byteCodeObjects.hasOwnProperty(iter7))
      {
        iter7 = this.byteCodeObjects[iter7];
        iter7.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.instance !== null && this.instance !== undefined) {
    output.writeFieldBegin('instance', Thrift.Type.STRING, 2);
    output.writeBinary(this.instance);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

object = function(args) {
  this.nameClass = null;
  this.instance = null;
  if (args) {
    if (args.nameClass !== undefined && args.nameClass !== null) {
      this.nameClass = args.nameClass;
    }
    if (args.instance !== undefined && args.instance !== null) {
      this.instance = args.instance;
    }
  }
};
object.prototype = {};
object.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.nameClass = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.instance = input.readBinary().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

object.prototype.write = function(output) {
  output.writeStructBegin('object');
  if (this.nameClass !== null && this.nameClass !== undefined) {
    output.writeFieldBegin('nameClass', Thrift.Type.STRING, 1);
    output.writeString(this.nameClass);
    output.writeFieldEnd();
  }
  if (this.instance !== null && this.instance !== undefined) {
    output.writeFieldBegin('instance', Thrift.Type.STRING, 2);
    output.writeBinary(this.instance);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Variant = function(args) {
  this.v_null = null;
  this.v_void = null;
  this.v_boolean = null;
  this.v_boolean_box = null;
  this.v_byte = null;
  this.v_byte_box = null;
  this.v_short = null;
  this.v_short_box = null;
  this.v_int = null;
  this.v_int_box = null;
  this.v_long = null;
  this.v_long_box = null;
  this.v_float = null;
  this.v_float_box = null;
  this.v_double = null;
  this.v_double_box = null;
  this.v_string = null;
  this.v_object = null;
  this.v_array = null;
  this.v_list = null;
  this.v_set = null;
  this.v_map = null;
  if (args) {
    if (args.v_null !== undefined && args.v_null !== null) {
      this.v_null = args.v_null;
    }
    if (args.v_void !== undefined && args.v_void !== null) {
      this.v_void = args.v_void;
    }
    if (args.v_boolean !== undefined && args.v_boolean !== null) {
      this.v_boolean = args.v_boolean;
    }
    if (args.v_boolean_box !== undefined && args.v_boolean_box !== null) {
      this.v_boolean_box = args.v_boolean_box;
    }
    if (args.v_byte !== undefined && args.v_byte !== null) {
      this.v_byte = args.v_byte;
    }
    if (args.v_byte_box !== undefined && args.v_byte_box !== null) {
      this.v_byte_box = args.v_byte_box;
    }
    if (args.v_short !== undefined && args.v_short !== null) {
      this.v_short = args.v_short;
    }
    if (args.v_short_box !== undefined && args.v_short_box !== null) {
      this.v_short_box = args.v_short_box;
    }
    if (args.v_int !== undefined && args.v_int !== null) {
      this.v_int = args.v_int;
    }
    if (args.v_int_box !== undefined && args.v_int_box !== null) {
      this.v_int_box = args.v_int_box;
    }
    if (args.v_long !== undefined && args.v_long !== null) {
      this.v_long = args.v_long;
    }
    if (args.v_long_box !== undefined && args.v_long_box !== null) {
      this.v_long_box = args.v_long_box;
    }
    if (args.v_float !== undefined && args.v_float !== null) {
      this.v_float = args.v_float;
    }
    if (args.v_float_box !== undefined && args.v_float_box !== null) {
      this.v_float_box = args.v_float_box;
    }
    if (args.v_double !== undefined && args.v_double !== null) {
      this.v_double = args.v_double;
    }
    if (args.v_double_box !== undefined && args.v_double_box !== null) {
      this.v_double_box = args.v_double_box;
    }
    if (args.v_string !== undefined && args.v_string !== null) {
      this.v_string = args.v_string;
    }
    if (args.v_object !== undefined && args.v_object !== null) {
      this.v_object = new object(args.v_object);
    }
    if (args.v_array !== undefined && args.v_array !== null) {
      this.v_array = Thrift.copyList(args.v_array, [null]);
    }
    if (args.v_list !== undefined && args.v_list !== null) {
      this.v_list = Thrift.copyList(args.v_list, [null]);
    }
    if (args.v_set !== undefined && args.v_set !== null) {
      this.v_set = Thrift.copyList(args.v_set, [null]);
    }
    if (args.v_map !== undefined && args.v_map !== null) {
      this.v_map = Thrift.copyMap(args.v_map, [null]);
    }
  }
};
Variant.prototype = {};
Variant.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.v_null = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.BYTE) {
        this.v_void = input.readByte().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.BOOL) {
        this.v_boolean = input.readBool().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.BOOL) {
        this.v_boolean_box = input.readBool().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 5:
      if (ftype == Thrift.Type.BYTE) {
        this.v_byte = input.readByte().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 6:
      if (ftype == Thrift.Type.BYTE) {
        this.v_byte_box = input.readByte().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 7:
      if (ftype == Thrift.Type.I16) {
        this.v_short = input.readI16().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 8:
      if (ftype == Thrift.Type.I16) {
        this.v_short_box = input.readI16().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 9:
      if (ftype == Thrift.Type.I32) {
        this.v_int = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 10:
      if (ftype == Thrift.Type.I32) {
        this.v_int_box = input.readI32().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 11:
      if (ftype == Thrift.Type.I64) {
        this.v_long = input.readI64().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 12:
      if (ftype == Thrift.Type.I64) {
        this.v_long_box = input.readI64().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 13:
      if (ftype == Thrift.Type.DOUBLE) {
        this.v_float = input.readDouble().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 14:
      if (ftype == Thrift.Type.DOUBLE) {
        this.v_float_box = input.readDouble().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 15:
      if (ftype == Thrift.Type.DOUBLE) {
        this.v_double = input.readDouble().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 16:
      if (ftype == Thrift.Type.DOUBLE) {
        this.v_double_box = input.readDouble().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 17:
      if (ftype == Thrift.Type.STRING) {
        this.v_string = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 18:
      if (ftype == Thrift.Type.STRUCT) {
        this.v_object = new object();
        this.v_object.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 19:
      if (ftype == Thrift.Type.LIST) {
        var _size8 = 0;
        var _rtmp312;
        this.v_array = [];
        var _etype11 = 0;
        _rtmp312 = input.readListBegin();
        _etype11 = _rtmp312.etype;
        _size8 = _rtmp312.size;
        for (var _i13 = 0; _i13 < _size8; ++_i13)
        {
          var elem14 = null;
          elem14 = new Variant();
          elem14.read(input);
          this.v_array.push(elem14);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 20:
      if (ftype == Thrift.Type.LIST) {
        var _size15 = 0;
        var _rtmp319;
        this.v_list = [];
        var _etype18 = 0;
        _rtmp319 = input.readListBegin();
        _etype18 = _rtmp319.etype;
        _size15 = _rtmp319.size;
        for (var _i20 = 0; _i20 < _size15; ++_i20)
        {
          var elem21 = null;
          elem21 = new Variant();
          elem21.read(input);
          this.v_list.push(elem21);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 21:
      if (ftype == Thrift.Type.SET) {
        var _size22 = 0;
        var _rtmp326;
        this.v_set = [];
        var _etype25 = 0;
        _rtmp326 = input.readSetBegin();
        _etype25 = _rtmp326.etype;
        _size22 = _rtmp326.size;
        for (var _i27 = 0; _i27 < _size22; ++_i27)
        {
          var elem28 = null;
          elem28 = new Variant();
          elem28.read(input);
          this.v_set.push(elem28);
        }
        input.readSetEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 22:
      if (ftype == Thrift.Type.MAP) {
        var _size29 = 0;
        var _rtmp333;
        this.v_map = {};
        var _ktype30 = 0;
        var _vtype31 = 0;
        _rtmp333 = input.readMapBegin();
        _ktype30 = _rtmp333.ktype;
        _vtype31 = _rtmp333.vtype;
        _size29 = _rtmp333.size;
        for (var _i34 = 0; _i34 < _size29; ++_i34)
        {
          if (_i34 > 0 ) {
            if (input.rstack.length > input.rpos[input.rpos.length -1] + 1) {
              input.rstack.pop();
            }
          }
          var key35 = null;
          var val36 = null;
          key35 = new Variant();
          key35.read(input);
          val36 = new Variant();
          val36.read(input);
          this.v_map[key35] = val36;
        }
        input.readMapEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Variant.prototype.write = function(output) {
  output.writeStructBegin('Variant');
  if (this.v_null !== null && this.v_null !== undefined) {
    output.writeFieldBegin('v_null', Thrift.Type.STRING, 1);
    output.writeString(this.v_null);
    output.writeFieldEnd();
  }
  if (this.v_void !== null && this.v_void !== undefined) {
    output.writeFieldBegin('v_void', Thrift.Type.BYTE, 2);
    output.writeByte(this.v_void);
    output.writeFieldEnd();
  }
  if (this.v_boolean !== null && this.v_boolean !== undefined) {
    output.writeFieldBegin('v_boolean', Thrift.Type.BOOL, 3);
    output.writeBool(this.v_boolean);
    output.writeFieldEnd();
  }
  if (this.v_boolean_box !== null && this.v_boolean_box !== undefined) {
    output.writeFieldBegin('v_boolean_box', Thrift.Type.BOOL, 4);
    output.writeBool(this.v_boolean_box);
    output.writeFieldEnd();
  }
  if (this.v_byte !== null && this.v_byte !== undefined) {
    output.writeFieldBegin('v_byte', Thrift.Type.BYTE, 5);
    output.writeByte(this.v_byte);
    output.writeFieldEnd();
  }
  if (this.v_byte_box !== null && this.v_byte_box !== undefined) {
    output.writeFieldBegin('v_byte_box', Thrift.Type.BYTE, 6);
    output.writeByte(this.v_byte_box);
    output.writeFieldEnd();
  }
  if (this.v_short !== null && this.v_short !== undefined) {
    output.writeFieldBegin('v_short', Thrift.Type.I16, 7);
    output.writeI16(this.v_short);
    output.writeFieldEnd();
  }
  if (this.v_short_box !== null && this.v_short_box !== undefined) {
    output.writeFieldBegin('v_short_box', Thrift.Type.I16, 8);
    output.writeI16(this.v_short_box);
    output.writeFieldEnd();
  }
  if (this.v_int !== null && this.v_int !== undefined) {
    output.writeFieldBegin('v_int', Thrift.Type.I32, 9);
    output.writeI32(this.v_int);
    output.writeFieldEnd();
  }
  if (this.v_int_box !== null && this.v_int_box !== undefined) {
    output.writeFieldBegin('v_int_box', Thrift.Type.I32, 10);
    output.writeI32(this.v_int_box);
    output.writeFieldEnd();
  }
  if (this.v_long !== null && this.v_long !== undefined) {
    output.writeFieldBegin('v_long', Thrift.Type.I64, 11);
    output.writeI64(this.v_long);
    output.writeFieldEnd();
  }
  if (this.v_long_box !== null && this.v_long_box !== undefined) {
    output.writeFieldBegin('v_long_box', Thrift.Type.I64, 12);
    output.writeI64(this.v_long_box);
    output.writeFieldEnd();
  }
  if (this.v_float !== null && this.v_float !== undefined) {
    output.writeFieldBegin('v_float', Thrift.Type.DOUBLE, 13);
    output.writeDouble(this.v_float);
    output.writeFieldEnd();
  }
  if (this.v_float_box !== null && this.v_float_box !== undefined) {
    output.writeFieldBegin('v_float_box', Thrift.Type.DOUBLE, 14);
    output.writeDouble(this.v_float_box);
    output.writeFieldEnd();
  }
  if (this.v_double !== null && this.v_double !== undefined) {
    output.writeFieldBegin('v_double', Thrift.Type.DOUBLE, 15);
    output.writeDouble(this.v_double);
    output.writeFieldEnd();
  }
  if (this.v_double_box !== null && this.v_double_box !== undefined) {
    output.writeFieldBegin('v_double_box', Thrift.Type.DOUBLE, 16);
    output.writeDouble(this.v_double_box);
    output.writeFieldEnd();
  }
  if (this.v_string !== null && this.v_string !== undefined) {
    output.writeFieldBegin('v_string', Thrift.Type.STRING, 17);
    output.writeString(this.v_string);
    output.writeFieldEnd();
  }
  if (this.v_object !== null && this.v_object !== undefined) {
    output.writeFieldBegin('v_object', Thrift.Type.STRUCT, 18);
    this.v_object.write(output);
    output.writeFieldEnd();
  }
  if (this.v_array !== null && this.v_array !== undefined) {
    output.writeFieldBegin('v_array', Thrift.Type.LIST, 19);
    output.writeListBegin(Thrift.Type.STRUCT, this.v_array.length);
    for (var iter37 in this.v_array)
    {
      if (this.v_array.hasOwnProperty(iter37))
      {
        iter37 = this.v_array[iter37];
        iter37.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.v_list !== null && this.v_list !== undefined) {
    output.writeFieldBegin('v_list', Thrift.Type.LIST, 20);
    output.writeListBegin(Thrift.Type.STRUCT, this.v_list.length);
    for (var iter38 in this.v_list)
    {
      if (this.v_list.hasOwnProperty(iter38))
      {
        iter38 = this.v_list[iter38];
        iter38.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.v_set !== null && this.v_set !== undefined) {
    output.writeFieldBegin('v_set', Thrift.Type.SET, 21);
    output.writeSetBegin(Thrift.Type.STRUCT, this.v_set.length);
    for (var iter39 in this.v_set)
    {
      if (this.v_set.hasOwnProperty(iter39))
      {
        iter39 = this.v_set[iter39];
        iter39.write(output);
      }
    }
    output.writeSetEnd();
    output.writeFieldEnd();
  }
  if (this.v_map !== null && this.v_map !== undefined) {
    output.writeFieldBegin('v_map', Thrift.Type.MAP, 22);
    output.writeMapBegin(Thrift.Type.STRUCT, Thrift.Type.STRUCT, Thrift.objectLength(this.v_map));
    for (var kiter40 in this.v_map)
    {
      if (this.v_map.hasOwnProperty(kiter40))
      {
        var viter41 = this.v_map[kiter40];
        kiter40.write(output);
        viter41.write(output);
      }
    }
    output.writeMapEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Annotation = function(args) {
  this.name = null;
  this.arguments = null;
  if (args) {
    if (args.name !== undefined && args.name !== null) {
      this.name = args.name;
    }
    if (args.arguments !== undefined && args.arguments !== null) {
      this.arguments = Thrift.copyMap(args.arguments, [null]);
    }
  }
};
Annotation.prototype = {};
Annotation.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.name = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.MAP) {
        var _size42 = 0;
        var _rtmp346;
        this.arguments = {};
        var _ktype43 = 0;
        var _vtype44 = 0;
        _rtmp346 = input.readMapBegin();
        _ktype43 = _rtmp346.ktype;
        _vtype44 = _rtmp346.vtype;
        _size42 = _rtmp346.size;
        for (var _i47 = 0; _i47 < _size42; ++_i47)
        {
          if (_i47 > 0 ) {
            if (input.rstack.length > input.rpos[input.rpos.length -1] + 1) {
              input.rstack.pop();
            }
          }
          var key48 = null;
          var val49 = null;
          key48 = input.readString().value;
          val49 = input.readString().value;
          this.arguments[key48] = val49;
        }
        input.readMapEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Annotation.prototype.write = function(output) {
  output.writeStructBegin('Annotation');
  if (this.name !== null && this.name !== undefined) {
    output.writeFieldBegin('name', Thrift.Type.STRING, 1);
    output.writeString(this.name);
    output.writeFieldEnd();
  }
  if (this.arguments !== null && this.arguments !== undefined) {
    output.writeFieldBegin('arguments', Thrift.Type.MAP, 2);
    output.writeMapBegin(Thrift.Type.STRING, Thrift.Type.STRING, Thrift.objectLength(this.arguments));
    for (var kiter50 in this.arguments)
    {
      if (this.arguments.hasOwnProperty(kiter50))
      {
        var viter51 = this.arguments[kiter50];
        output.writeString(kiter50);
        output.writeString(viter51);
      }
    }
    output.writeMapEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

MethodArgument = function(args) {
  this.type = null;
  this.name = null;
  this.annotations = null;
  if (args) {
    if (args.type !== undefined && args.type !== null) {
      this.type = args.type;
    }
    if (args.name !== undefined && args.name !== null) {
      this.name = args.name;
    }
    if (args.annotations !== undefined && args.annotations !== null) {
      this.annotations = Thrift.copyList(args.annotations, [Annotation]);
    }
  }
};
MethodArgument.prototype = {};
MethodArgument.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.type = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.name = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.LIST) {
        var _size52 = 0;
        var _rtmp356;
        this.annotations = [];
        var _etype55 = 0;
        _rtmp356 = input.readListBegin();
        _etype55 = _rtmp356.etype;
        _size52 = _rtmp356.size;
        for (var _i57 = 0; _i57 < _size52; ++_i57)
        {
          var elem58 = null;
          elem58 = new Annotation();
          elem58.read(input);
          this.annotations.push(elem58);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

MethodArgument.prototype.write = function(output) {
  output.writeStructBegin('MethodArgument');
  if (this.type !== null && this.type !== undefined) {
    output.writeFieldBegin('type', Thrift.Type.STRING, 1);
    output.writeString(this.type);
    output.writeFieldEnd();
  }
  if (this.name !== null && this.name !== undefined) {
    output.writeFieldBegin('name', Thrift.Type.STRING, 2);
    output.writeString(this.name);
    output.writeFieldEnd();
  }
  if (this.annotations !== null && this.annotations !== undefined) {
    output.writeFieldBegin('annotations', Thrift.Type.LIST, 3);
    output.writeListBegin(Thrift.Type.STRUCT, this.annotations.length);
    for (var iter59 in this.annotations)
    {
      if (this.annotations.hasOwnProperty(iter59))
      {
        iter59 = this.annotations[iter59];
        iter59.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

MethodDescription = function(args) {
  this.returnType = null;
  this.name = null;
  this.arguments = null;
  this.annotations = null;
  if (args) {
    if (args.returnType !== undefined && args.returnType !== null) {
      this.returnType = args.returnType;
    }
    if (args.name !== undefined && args.name !== null) {
      this.name = args.name;
    }
    if (args.arguments !== undefined && args.arguments !== null) {
      this.arguments = Thrift.copyList(args.arguments, [MethodArgument]);
    }
    if (args.annotations !== undefined && args.annotations !== null) {
      this.annotations = Thrift.copyList(args.annotations, [Annotation]);
    }
  }
};
MethodDescription.prototype = {};
MethodDescription.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.returnType = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.name = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 3:
      if (ftype == Thrift.Type.LIST) {
        var _size60 = 0;
        var _rtmp364;
        this.arguments = [];
        var _etype63 = 0;
        _rtmp364 = input.readListBegin();
        _etype63 = _rtmp364.etype;
        _size60 = _rtmp364.size;
        for (var _i65 = 0; _i65 < _size60; ++_i65)
        {
          var elem66 = null;
          elem66 = new MethodArgument();
          elem66.read(input);
          this.arguments.push(elem66);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      case 4:
      if (ftype == Thrift.Type.LIST) {
        var _size67 = 0;
        var _rtmp371;
        this.annotations = [];
        var _etype70 = 0;
        _rtmp371 = input.readListBegin();
        _etype70 = _rtmp371.etype;
        _size67 = _rtmp371.size;
        for (var _i72 = 0; _i72 < _size67; ++_i72)
        {
          var elem73 = null;
          elem73 = new Annotation();
          elem73.read(input);
          this.annotations.push(elem73);
        }
        input.readListEnd();
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

MethodDescription.prototype.write = function(output) {
  output.writeStructBegin('MethodDescription');
  if (this.returnType !== null && this.returnType !== undefined) {
    output.writeFieldBegin('returnType', Thrift.Type.STRING, 1);
    output.writeString(this.returnType);
    output.writeFieldEnd();
  }
  if (this.name !== null && this.name !== undefined) {
    output.writeFieldBegin('name', Thrift.Type.STRING, 2);
    output.writeString(this.name);
    output.writeFieldEnd();
  }
  if (this.arguments !== null && this.arguments !== undefined) {
    output.writeFieldBegin('arguments', Thrift.Type.LIST, 3);
    output.writeListBegin(Thrift.Type.STRUCT, this.arguments.length);
    for (var iter74 in this.arguments)
    {
      if (this.arguments.hasOwnProperty(iter74))
      {
        iter74 = this.arguments[iter74];
        iter74.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  if (this.annotations !== null && this.annotations !== undefined) {
    output.writeFieldBegin('annotations', Thrift.Type.LIST, 4);
    output.writeListBegin(Thrift.Type.STRUCT, this.annotations.length);
    for (var iter75 in this.annotations)
    {
      if (this.annotations.hasOwnProperty(iter75))
      {
        iter75 = this.annotations[iter75];
        iter75.write(output);
      }
    }
    output.writeListEnd();
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

ByteCodeObject = function(args) {
  this.name = null;
  this.byteCode = null;
  if (args) {
    if (args.name !== undefined && args.name !== null) {
      this.name = args.name;
    }
    if (args.byteCode !== undefined && args.byteCode !== null) {
      this.byteCode = args.byteCode;
    }
  }
};
ByteCodeObject.prototype = {};
ByteCodeObject.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRING) {
        this.name = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.byteCode = input.readBinary().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

ByteCodeObject.prototype.write = function(output) {
  output.writeStructBegin('ByteCodeObject');
  if (this.name !== null && this.name !== undefined) {
    output.writeFieldBegin('name', Thrift.Type.STRING, 1);
    output.writeString(this.name);
    output.writeFieldEnd();
  }
  if (this.byteCode !== null && this.byteCode !== undefined) {
    output.writeFieldBegin('byteCode', Thrift.Type.STRING, 2);
    output.writeBinary(this.byteCode);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

APIResponse = function(args) {
  this.code = null;
  this.message = null;
  if (args) {
    if (args.code !== undefined && args.code !== null) {
      this.code = args.code;
    }
    if (args.message !== undefined && args.message !== null) {
      this.message = args.message;
    }
  }
};
APIResponse.prototype = {};
APIResponse.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.BYTE) {
        this.code = input.readByte().value;
      } else {
        input.skip(ftype);
      }
      break;
      case 2:
      if (ftype == Thrift.Type.STRING) {
        this.message = input.readString().value;
      } else {
        input.skip(ftype);
      }
      break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

APIResponse.prototype.write = function(output) {
  output.writeStructBegin('APIResponse');
  if (this.code !== null && this.code !== undefined) {
    output.writeFieldBegin('code', Thrift.Type.BYTE, 1);
    output.writeByte(this.code);
    output.writeFieldEnd();
  }
  if (this.message !== null && this.message !== undefined) {
    output.writeFieldBegin('message', Thrift.Type.STRING, 2);
    output.writeString(this.message);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};
