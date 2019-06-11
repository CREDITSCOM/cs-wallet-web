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
  public partial class SmartContractDeploy : TBase
  {
    private string _sourceCode;
    private List<ByteCodeObject> _byteCodeObjects;
    private string _hashState;
    private TokenStandart _tokenStandart;

    public string SourceCode
    {
      get
      {
        return _sourceCode;
      }
      set
      {
        __isset.sourceCode = true;
        this._sourceCode = value;
      }
    }

    public List<ByteCodeObject> ByteCodeObjects
    {
      get
      {
        return _byteCodeObjects;
      }
      set
      {
        __isset.byteCodeObjects = true;
        this._byteCodeObjects = value;
      }
    }

    public string HashState
    {
      get
      {
        return _hashState;
      }
      set
      {
        __isset.hashState = true;
        this._hashState = value;
      }
    }

    public TokenStandart TokenStandart
    {
      get
      {
        return _tokenStandart;
      }
      set
      {
        __isset.tokenStandart = true;
        this._tokenStandart = value;
      }
    }


    public Isset __isset;
    #if !SILVERLIGHT
    [Serializable]
    #endif
    public struct Isset {
      public bool sourceCode;
      public bool byteCodeObjects;
      public bool hashState;
      public bool tokenStandart;
    }

    public SmartContractDeploy() {
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
                SourceCode = iprot.ReadString();
              } else { 
                TProtocolUtil.Skip(iprot, field.Type);
              }
              break;
            case 2:
              if (field.Type == TType.List) {
                {
                  ByteCodeObjects = new List<ByteCodeObject>();
                  TList _list0 = iprot.ReadListBegin();
                  for( int _i1 = 0; _i1 < _list0.Count; ++_i1)
                  {
                    ByteCodeObject _elem2;
                    _elem2 = new ByteCodeObject();
                    _elem2.Read(iprot);
                    ByteCodeObjects.Add(_elem2);
                  }
                  iprot.ReadListEnd();
                }
              } else { 
                TProtocolUtil.Skip(iprot, field.Type);
              }
              break;
            case 3:
              if (field.Type == TType.String) {
                HashState = iprot.ReadString();
              } else { 
                TProtocolUtil.Skip(iprot, field.Type);
              }
              break;
            case 4:
              if (field.Type == TType.I32) {
                TokenStandart = (TokenStandart)iprot.ReadI32();
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
        TStruct struc = new TStruct("SmartContractDeploy");
        oprot.WriteStructBegin(struc);
        TField field = new TField();
        if (SourceCode != null && __isset.sourceCode) {
          field.Name = "sourceCode";
          field.Type = TType.String;
          field.ID = 1;
          oprot.WriteFieldBegin(field);
          oprot.WriteString(SourceCode);
          oprot.WriteFieldEnd();
        }
        if (ByteCodeObjects != null && __isset.byteCodeObjects) {
          field.Name = "byteCodeObjects";
          field.Type = TType.List;
          field.ID = 2;
          oprot.WriteFieldBegin(field);
          {
            oprot.WriteListBegin(new TList(TType.Struct, ByteCodeObjects.Count));
            foreach (ByteCodeObject _iter3 in ByteCodeObjects)
            {
              _iter3.Write(oprot);
            }
            oprot.WriteListEnd();
          }
          oprot.WriteFieldEnd();
        }
        if (HashState != null && __isset.hashState) {
          field.Name = "hashState";
          field.Type = TType.String;
          field.ID = 3;
          oprot.WriteFieldBegin(field);
          oprot.WriteString(HashState);
          oprot.WriteFieldEnd();
        }
        if (__isset.tokenStandart) {
          field.Name = "tokenStandart";
          field.Type = TType.I32;
          field.ID = 4;
          oprot.WriteFieldBegin(field);
          oprot.WriteI32((int)TokenStandart);
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
      StringBuilder __sb = new StringBuilder("SmartContractDeploy(");
      bool __first = true;
      if (SourceCode != null && __isset.sourceCode) {
        if(!__first) { __sb.Append(", "); }
        __first = false;
        __sb.Append("SourceCode: ");
        __sb.Append(SourceCode);
      }
      if (ByteCodeObjects != null && __isset.byteCodeObjects) {
        if(!__first) { __sb.Append(", "); }
        __first = false;
        __sb.Append("ByteCodeObjects: ");
        __sb.Append(ByteCodeObjects);
      }
      if (HashState != null && __isset.hashState) {
        if(!__first) { __sb.Append(", "); }
        __first = false;
        __sb.Append("HashState: ");
        __sb.Append(HashState);
      }
      if (__isset.tokenStandart) {
        if(!__first) { __sb.Append(", "); }
        __first = false;
        __sb.Append("TokenStandart: ");
        __sb.Append(TokenStandart);
      }
      __sb.Append(")");
      return __sb.ToString();
    }

  }

}
