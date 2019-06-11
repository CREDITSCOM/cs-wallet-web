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
  public partial class SmartContract : TBase
  {
    private byte[] _deployer;
    private SmartContractDeploy _smartContractDeploy;
    private byte[] _objectState;
    private long _createTime;
    private int _transactionsCount;

    public byte[] Address { get; set; }

    public byte[] Deployer
    {
      get
      {
        return _deployer;
      }
      set
      {
        __isset.deployer = true;
        this._deployer = value;
      }
    }

    public SmartContractDeploy SmartContractDeploy
    {
      get
      {
        return _smartContractDeploy;
      }
      set
      {
        __isset.smartContractDeploy = true;
        this._smartContractDeploy = value;
      }
    }

    public byte[] ObjectState
    {
      get
      {
        return _objectState;
      }
      set
      {
        __isset.objectState = true;
        this._objectState = value;
      }
    }

    public long CreateTime
    {
      get
      {
        return _createTime;
      }
      set
      {
        __isset.createTime = true;
        this._createTime = value;
      }
    }

    public int TransactionsCount
    {
      get
      {
        return _transactionsCount;
      }
      set
      {
        __isset.transactionsCount = true;
        this._transactionsCount = value;
      }
    }


    public Isset __isset;
    #if !SILVERLIGHT
    [Serializable]
    #endif
    public struct Isset {
      public bool deployer;
      public bool smartContractDeploy;
      public bool objectState;
      public bool createTime;
      public bool transactionsCount;
    }

    public SmartContract() {
    }

    public SmartContract(byte[] address) : this() {
      this.Address = address;
    }

    public void Read (TProtocol iprot)
    {
      iprot.IncrementRecursionDepth();
      try
      {
        bool isset_address = false;
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
                isset_address = true;
              } else { 
                TProtocolUtil.Skip(iprot, field.Type);
              }
              break;
            case 2:
              if (field.Type == TType.String) {
                Deployer = iprot.ReadBinary();
              } else { 
                TProtocolUtil.Skip(iprot, field.Type);
              }
              break;
            case 3:
              if (field.Type == TType.Struct) {
                SmartContractDeploy = new SmartContractDeploy();
                SmartContractDeploy.Read(iprot);
              } else { 
                TProtocolUtil.Skip(iprot, field.Type);
              }
              break;
            case 4:
              if (field.Type == TType.String) {
                ObjectState = iprot.ReadBinary();
              } else { 
                TProtocolUtil.Skip(iprot, field.Type);
              }
              break;
            case 5:
              if (field.Type == TType.I64) {
                CreateTime = iprot.ReadI64();
              } else { 
                TProtocolUtil.Skip(iprot, field.Type);
              }
              break;
            case 6:
              if (field.Type == TType.I32) {
                TransactionsCount = iprot.ReadI32();
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
        if (!isset_address)
          throw new TProtocolException(TProtocolException.INVALID_DATA, "required field Address not set");
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
        TStruct struc = new TStruct("SmartContract");
        oprot.WriteStructBegin(struc);
        TField field = new TField();
        if (Address == null)
          throw new TProtocolException(TProtocolException.INVALID_DATA, "required field Address not set");
        field.Name = "address";
        field.Type = TType.String;
        field.ID = 1;
        oprot.WriteFieldBegin(field);
        oprot.WriteBinary(Address);
        oprot.WriteFieldEnd();
        if (Deployer != null && __isset.deployer) {
          field.Name = "deployer";
          field.Type = TType.String;
          field.ID = 2;
          oprot.WriteFieldBegin(field);
          oprot.WriteBinary(Deployer);
          oprot.WriteFieldEnd();
        }
        if (SmartContractDeploy != null && __isset.smartContractDeploy) {
          field.Name = "smartContractDeploy";
          field.Type = TType.Struct;
          field.ID = 3;
          oprot.WriteFieldBegin(field);
          SmartContractDeploy.Write(oprot);
          oprot.WriteFieldEnd();
        }
        if (ObjectState != null && __isset.objectState) {
          field.Name = "objectState";
          field.Type = TType.String;
          field.ID = 4;
          oprot.WriteFieldBegin(field);
          oprot.WriteBinary(ObjectState);
          oprot.WriteFieldEnd();
        }
        if (__isset.createTime) {
          field.Name = "createTime";
          field.Type = TType.I64;
          field.ID = 5;
          oprot.WriteFieldBegin(field);
          oprot.WriteI64(CreateTime);
          oprot.WriteFieldEnd();
        }
        if (__isset.transactionsCount) {
          field.Name = "transactionsCount";
          field.Type = TType.I32;
          field.ID = 6;
          oprot.WriteFieldBegin(field);
          oprot.WriteI32(TransactionsCount);
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
      StringBuilder __sb = new StringBuilder("SmartContract(");
      __sb.Append(", Address: ");
      __sb.Append(Address);
      if (Deployer != null && __isset.deployer) {
        __sb.Append(", Deployer: ");
        __sb.Append(Deployer);
      }
      if (SmartContractDeploy != null && __isset.smartContractDeploy) {
        __sb.Append(", SmartContractDeploy: ");
        __sb.Append(SmartContractDeploy== null ? "<null>" : SmartContractDeploy.ToString());
      }
      if (ObjectState != null && __isset.objectState) {
        __sb.Append(", ObjectState: ");
        __sb.Append(ObjectState);
      }
      if (__isset.createTime) {
        __sb.Append(", CreateTime: ");
        __sb.Append(CreateTime);
      }
      if (__isset.transactionsCount) {
        __sb.Append(", TransactionsCount: ");
        __sb.Append(TransactionsCount);
      }
      __sb.Append(")");
      return __sb.ToString();
    }

  }

}
