/**
 * Autogenerated by Thrift Compiler (0.11.0)
 *
 * DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
 *  @generated
 */
using System;
using System.Collections;
using System.Collections.Generic;
using System.Text;
using System.IO;
using Thrift;
using Thrift.Collections;
using System.Runtime.Serialization;
using Thrift.Protocol;
using Thrift.Transport;

namespace NodeApi
{

  #if !SILVERLIGHT
  [Serializable]
  #endif
  public partial class TrustedInfo : TBase
  {
    private byte[] _address;
    private int _timesWriter;
    private int _timesTrusted;
    private Amount _feeCollected;

    public byte[] Address
    {
      get
      {
        return _address;
      }
      set
      {
        __isset.address = true;
        this._address = value;
      }
    }

    public int TimesWriter
    {
      get
      {
        return _timesWriter;
      }
      set
      {
        __isset.timesWriter = true;
        this._timesWriter = value;
      }
    }

    public int TimesTrusted
    {
      get
      {
        return _timesTrusted;
      }
      set
      {
        __isset.timesTrusted = true;
        this._timesTrusted = value;
      }
    }

    public Amount FeeCollected
    {
      get
      {
        return _feeCollected;
      }
      set
      {
        __isset.feeCollected = true;
        this._feeCollected = value;
      }
    }


    public Isset __isset;
    #if !SILVERLIGHT
    [Serializable]
    #endif
    public struct Isset {
      public bool address;
      public bool timesWriter;
      public bool timesTrusted;
      public bool feeCollected;
    }

    public TrustedInfo() {
    }

    public void Read (TProtocol iprot)
    {
      iprot.IncrementRecursionDepth();
      try
      {
        TField field;
        iprot.ReadStructBegin();
        while (true)
        {
          field = iprot.ReadFieldBegin();
          if (field.Type == TType.Stop) { 
            break;
          }
          switch (field.ID)
          {
            case 1:
              if (field.Type == TType.String) {
                Address = iprot.ReadBinary();
              } else { 
                TProtocolUtil.Skip(iprot, field.Type);
              }
              break;
            case 2:
              if (field.Type == TType.I32) {
                TimesWriter = iprot.ReadI32();
              } else { 
                TProtocolUtil.Skip(iprot, field.Type);
              }
              break;
            case 3:
              if (field.Type == TType.I32) {
                TimesTrusted = iprot.ReadI32();
              } else { 
                TProtocolUtil.Skip(iprot, field.Type);
              }
              break;
            case 4:
              if (field.Type == TType.Struct) {
                FeeCollected = new Amount();
                FeeCollected.Read(iprot);
              } else { 
                TProtocolUtil.Skip(iprot, field.Type);
              }
              break;
            default: 
              TProtocolUtil.Skip(iprot, field.Type);
              break;
          }
          iprot.ReadFieldEnd();
        }
        iprot.ReadStructEnd();
      }
      finally
      {
        iprot.DecrementRecursionDepth();
      }
    }

    public void Write(TProtocol oprot) {
      oprot.IncrementRecursionDepth();
      try
      {
        TStruct struc = new TStruct("TrustedInfo");
        oprot.WriteStructBegin(struc);
        TField field = new TField();
        if (Address != null && __isset.address) {
          field.Name = "address";
          field.Type = TType.String;
          field.ID = 1;
          oprot.WriteFieldBegin(field);
          oprot.WriteBinary(Address);
          oprot.WriteFieldEnd();
        }
        if (__isset.timesWriter) {
          field.Name = "timesWriter";
          field.Type = TType.I32;
          field.ID = 2;
          oprot.WriteFieldBegin(field);
          oprot.WriteI32(TimesWriter);
          oprot.WriteFieldEnd();
        }
        if (__isset.timesTrusted) {
          field.Name = "timesTrusted";
          field.Type = TType.I32;
          field.ID = 3;
          oprot.WriteFieldBegin(field);
          oprot.WriteI32(TimesTrusted);
          oprot.WriteFieldEnd();
        }
        if (FeeCollected != null && __isset.feeCollected) {
          field.Name = "feeCollected";
          field.Type = TType.Struct;
          field.ID = 4;
          oprot.WriteFieldBegin(field);
          FeeCollected.Write(oprot);
          oprot.WriteFieldEnd();
        }
        oprot.WriteFieldStop();
        oprot.WriteStructEnd();
      }
      finally
      {
        oprot.DecrementRecursionDepth();
      }
    }

    public override string ToString() {
      StringBuilder __sb = new StringBuilder("TrustedInfo(");
      bool __first = true;
      if (Address != null && __isset.address) {
        if(!__first) { __sb.Append(", "); }
        __first = false;
        __sb.Append("Address: ");
        __sb.Append(Address);
      }
      if (__isset.timesWriter) {
        if(!__first) { __sb.Append(", "); }
        __first = false;
        __sb.Append("TimesWriter: ");
        __sb.Append(TimesWriter);
      }
      if (__isset.timesTrusted) {
        if(!__first) { __sb.Append(", "); }
        __first = false;
        __sb.Append("TimesTrusted: ");
        __sb.Append(TimesTrusted);
      }
      if (FeeCollected != null && __isset.feeCollected) {
        if(!__first) { __sb.Append(", "); }
        __first = false;
        __sb.Append("FeeCollected: ");
        __sb.Append(FeeCollected== null ? "<null>" : FeeCollected.ToString());
      }
      __sb.Append(")");
      return __sb.ToString();
    }

  }

}
