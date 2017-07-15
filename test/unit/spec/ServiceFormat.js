/* eslint no-var: 0 */
/* globals describe,commonSpec,it,expect */
/* jshint varstmt: false */
'use strict';

describe('Format service', function() {
  let spec = {};

  commonSpec(spec);

  describe('formatting functions', function() {
    it('should format reactions', function() {
      spec.data.reactions = {};
      spec.data.reactions['1H-p'] = {
        'reactant': {'1H-':1,'p':1},
        'product': {'H2':1},
        'elements': [ 'H' ]
      };
      spec.data.resources['1H-'] = {html:'<sup>1</sup>H<sup>-</sup>'}

      let value = spec.format.reactionFormat(1, spec.data.reactions['1H-p']);

      expect(value).toEqual('<sup>1</sup>H<sup>-</sup> + p <span class=\'icon\'>&#8594;</span> H<sub>2</sub>');
    });

    it('should format multiple reactions', function() {
      spec.data.reactions = {};
      spec.data.reactions['1H-p'] = {
        'reactant': {'1H-':1,'p':1},
        'product': {'H2':1},
        'elements': [ 'H' ]
      };
      spec.data.resources['1H-'] = {html:'<sup>1</sup>H<sup>-</sup>'}

      let value = spec.format.reactionFormat(10, spec.data.reactions['1H-p']);

      expect(value).toEqual('10 <sup>1</sup>H<sup>-</sup> + 10 p <span class=\'icon\'>&#8594;</span> 10 H<sub>2</sub>');
    });

    it('should format single compounds', function() {
      spec.data.reactions = {};
      spec.data.reactions['1H-p'] = {
        'reactant': {'1H-':1,'p':1},
        'product': {'H2':1},
        'elements': [ 'H' ]
      };
      spec.data.resources['1H-'] = {html:'<sup>1</sup>H<sup>-</sup>'}

      let value = spec.format.compoundFormat(1, spec.data.reactions['1H-p'].product);

      expect(value).toEqual('H<sub>2</sub>');
    });

    it('should format mutiple compounds', function() {
      spec.data.reactions = {};
      spec.data.reactions['1H-p'] = {
        'reactant': {'1H-':1,'p':1},
        'product': {'H2':1},
        'elements': [ 'H' ]
      };
      spec.data.resources['1H-'] = {html:'<sup>1</sup>H<sup>-</sup>'}

      let value = spec.format.compoundFormat(10, spec.data.reactions['1H-p'].product);

      expect(value).toEqual('10 H<sub>2</sub>');
    });

    it('should format decay', function() {
      spec.data.resources['He+'].html = 'He<sup>+</sup>';
      spec.data.resources['e-'].html = 'e<sup>-</sup>';
      spec.data.resources['3H'].decay.decay_types['beta-'].decay_product = {};
      spec.data.resources['3H'].decay.decay_types['beta-'].decay_product["He+"] = 1;
      spec.data.resources['3H'].decay.decay_types['beta-'].decay_product["e-"] = 1;
      spec.data.resources['3H'].decay.decay_types['beta-'].decay_product.eV = 18610;

      let value = spec.format.decayFormat(spec.data.resources['3H'].decay.decay_types['beta-']);

      expect(value).toEqual('He<sup>+</sup> + e<sup>-</sup> + 18,610 eV');
    });

    it('should format decay without energy', function() {
      spec.data.resources['He+'].html = 'He<sup>+</sup>';
      spec.data.resources['e-'].html = 'e<sup>-</sup>';
      spec.data.resources['3H'].decay.decay_types['beta-'].decay_product = {};
      spec.data.resources['3H'].decay.decay_types['beta-'].decay_product["He+"] = 1;
      spec.data.resources['3H'].decay.decay_types['beta-'].decay_product["e-"] = 1;

      let value = spec.format.decayFormat(spec.data.resources['3H'].decay.decay_types['beta-']);

      expect(value).toEqual('He<sup>+</sup> + e<sup>-</sup>');
    });
  });
});
