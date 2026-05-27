const mongoose = require('mongoose');
const Country = require('../../src/models/country.model');
const Indicator = require('../../src/models/indicator.model');
const DataPoint = require('../../src/models/dataPoint.model');

describe('Database Models Schema Validation', () => {
  describe('Country Model', () => {
    it('should validate a correct country document', () => {
      const country = new Country({
        _id: 'USA',
        name: 'United States'
      });
      const err = country.validateSync();
      expect(err).toBeUndefined();
    });

    it('should fail validation if country code _id is not 3 characters long', () => {
      const country = new Country({
        _id: 'US',
        name: 'United States'
      });
      const err = country.validateSync();
      expect(err).toBeDefined();
      expect(err.errors._id).toBeDefined();
    });

    it('should fail validation if name is missing', () => {
      const country = new Country({
        _id: 'USA'
      });
      const err = country.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.name).toBeDefined();
    });
  });

  describe('Indicator Model', () => {
    it('should validate a correct indicator document', () => {
      const indicator = new Indicator({
        _id: 'FAO_CP_23012',
        label: 'Consumer Prices, General Indices (2015 = 100)'
      });
      const err = indicator.validateSync();
      expect(err).toBeUndefined();
    });

    it('should fail validation if label is missing', () => {
      const indicator = new Indicator({
        _id: 'FAO_CP_23012'
      });
      const err = indicator.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.label).toBeDefined();
    });
  });

  describe('DataPoint Model', () => {
    it('should validate a correct monthly datapoint document', () => {
      const datapoint = new DataPoint({
        country: 'USA',
        indicator: 'FAO_CP_23012',
        value: 104.5,
        year: 2020,
        month: 6,
        frequency: 'monthly'
      });
      const err = datapoint.validateSync();
      expect(err).toBeUndefined();
    });

    it('should fail validation if month is out of range 1-12', () => {
      const datapoint = new DataPoint({
        country: 'USA',
        indicator: 'FAO_CP_23012',
        value: 104.5,
        year: 2020,
        month: 13,
        frequency: 'monthly'
      });
      const err = datapoint.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.month).toBeDefined();
    });

    it('should fail validation if frequency is not monthly', () => {
      const datapoint = new DataPoint({
        country: 'USA',
        indicator: 'FAO_CP_23012',
        value: 104.5,
        year: 2020,
        month: 6,
        frequency: 'annual'
      });
      const err = datapoint.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.frequency).toBeDefined();
    });

    it('should default frequency to monthly', () => {
      const datapoint = new DataPoint({
        country: 'USA',
        indicator: 'FAO_CP_23012',
        value: 104.5,
        year: 2020,
        month: 6
      });
      expect(datapoint.frequency).toBe('monthly');
      const err = datapoint.validateSync();
      expect(err).toBeUndefined();
    });
  });
});
