import chai, { expect } from 'chai';
import Helper from '../../src/e2e-helper/e2e-helper';

chai.use(require('chai-fs'));

const assertArrays = require('chai-arrays');

chai.use(assertArrays);

describe('harmony extension config', function() {
  this.timeout(0);
  const helper = new Helper();

  after(() => {
    helper.scopeHelper.destroy();
  });
  describe('core extensions', () => {
    let componentVersionModel;
    const config = { key: 'val' };
    let extensionData;
    let devDeps;
    before(() => {
      helper.scopeHelper.reInitLocalScope();
      helper.fixtures.createComponentBarFoo();
      helper.fixtures.addComponentBarFoo();
      helper.extensions.configureExtension('Scope', config);
      helper.command.tagAllComponents();
      componentVersionModel = helper.command.catComponent('bar/foo@0.0.1');
      extensionData = componentVersionModel.extensions;
      devDeps = componentVersionModel.devDependencies;
    });
    it('should persist core extension config during tag', () => {
      expect(extensionData).to.be.length(1);
      expect(extensionData[0].config).to.deep.equal(config);
    });
    it('should not have version for core extension in the models', () => {
      expect(extensionData[0].name).to.equal('Scope');
    });
    it('should not insert core extensions into the component dev deps', () => {
      expect(devDeps).to.be.length(0);
    });
  });
  describe('3rd party extensions', () => {
    describe('extension is new component on the workspace', () => {
      it('should not allow tagging the component without tagging the extensions', () => {});
      describe('tagging extension and component together', () => {
        it('should have version for extension in the component models when tagging with the component', () => {});
        it('should persist extension config during tag', () => {});
        it('should insert extensions into the component dev deps', () => {});
        it('should auto tag the component when tagging the extension again', () => {});
      });
      describe('tagging extension then component', () => {
        it('should have version for extension in the component models when tagging the extension before component', () => {});
        it('should insert extensions into the component dev deps', () => {});
      });
      describe('exporting component with extension', () => {
        it('should block exporting component without exporting the extension', () => {});
        describe('exporting extension and component together', () => {
          it('should update extension scope in the component when exporting together', () => {});
        });
        describe('exporting extension then exporting component', () => {
          it('should update extension scope in the component when exporting component after exporting the extension', () => {});
        });
      });
    });
  });
});
