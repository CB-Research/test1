import { Moment } from 'moment';

export interface Historic {
  contextResponses: {
    contextElement: {
      attributes: {
        name: string,
        values: {
          recvTime: Moment,
          attrType: string,
          attrValue: number
        }[]
      }[]
    }
  }[];
}
