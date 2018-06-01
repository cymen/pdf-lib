// This is required to prevent an error due to circular imports in this test
import 'core/pdf-objects';

import PDFOperator from 'core/pdf-operators/PDFOperator';
import { typedArrayFor } from 'utils';

interface IPDFOperatorSingleton {
  operator: PDFOperator;
}

/*
 * This is a generic test for singletons generated by calling:
 *   PDFOperator.createSingletonOp(string)
 */
export default (
  operatorClassName: string,
  operatorStr: string,
  Operator: IPDFOperatorSingleton,
) => {
  describe(operatorClassName, () => {
    it(`is a Singleton class that extends PDFOperator`, () => {
      expect(() => new Operator()).toThrowError(
        `Cannot instantiate PDFOperator.T* - use "T*.operator" instead`,
      );
      expect(Operator.operator).toBeInstanceOf(PDFOperator);
      expect(Operator.operator).toBe(Operator.operator);
    });

    describe(`"toString" method`, () => {
      it(`returns ${operatorClassName} as a string`, () => {
        expect(Operator.operator.toString()).toEqual(`${operatorStr}\n`);
      });
    });

    describe(`"bytesSize" method`, () => {
      it(`returns the size of ${operatorClassName} in bytes`, () => {
        expect(Operator.operator.bytesSize()).toEqual(3);
      });
    });

    describe(`"copyBytesInto" method`, () => {
      it(`copies ${operatorClassName} into the buffer as bytes`, () => {
        const buffer = new Uint8Array(Operator.operator.bytesSize());
        Operator.operator.copyBytesInto(buffer);
        expect(buffer).toEqual(typedArrayFor(`${operatorStr}\n`));
      });
    });
  });
};
