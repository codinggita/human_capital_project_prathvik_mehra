import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, MenuItem, Select, FormControl, InputLabel, FormHelperText, Grid, useTheme } from '@mui/material';
import Input from '../ui/Input';
import Button from '../ui/Button';

const validationSchema = Yup.object({
  frequency: Yup.string().oneOf(['M', 'A'], 'Select a valid frequency').required('Frequency is required'),
  countryCode: Yup.string()
    .length(3, 'Country code must be exactly 3 characters (e.g. USA)')
    .required('Country code is required'),
  countryName: Yup.string().required('Country name is required'),
  indicatorCode: Yup.string().required('Indicator code is required'),
  indicatorName: Yup.string().required('Indicator name is required'),
  value: Yup.number().typeError('Value must be a number').required('Value is required'),
  year: Yup.number()
    .min(1900, 'Year must be 1900 or later')
    .max(new Date().getFullYear() + 1, 'Invalid year')
    .required('Year is required'),
  month: Yup.number()
    .nullable()
    .when('frequency', {
      is: 'M',
      then: () => Yup.number().min(1, 'Month must be between 1 and 12').max(12, 'Month must be between 1 and 12').required('Month is required for monthly frequency'),
      otherwise: () => Yup.number().nullable().notRequired()
    })
});

const PriceForm = ({ initialValues, onSubmit, loading }) => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const defaultValues = {
    frequency: 'A',
    countryCode: '',
    countryName: '',
    indicatorCode: '',
    indicatorName: '',
    value: '',
    year: new Date().getFullYear(),
    month: '',
  };

  const formik = useFormik({
    initialValues: initialValues || defaultValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: (values) => {
      // Clean up values before submitting: if frequency is Annual, month should be null
      const formattedValues = {
        ...values,
        frequency: values.frequency.toUpperCase(),
        countryCode: values.countryCode.toUpperCase(),
        indicatorCode: values.indicatorCode.toUpperCase(),
        month: values.frequency === 'M' ? Number(values.month) : null,
        value: Number(values.value),
        year: Number(values.year),
      };
      onSubmit(formattedValues);
    },
  });

  const selectShadow = isDark
    ? 'inset 2px 2px 5px #080c16, inset -2px -2px 5px #16223e'
    : 'inset 2px 2px 5px #d1d9e6, inset -2px -2px 5px #ffffff';

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2.5}>
        {/* Frequency */}
        <Grid xs={12} sm={6}>
          <FormControl
            fullWidth
            size="small"
            error={formik.touched.frequency && Boolean(formik.errors.frequency)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                boxShadow: selectShadow,
                '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '&:hover .MuiOutlinedInput-notchedOutline': { border: 'none' },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 'none' },
              },
            }}
          >
            <InputLabel id="frequency-label" sx={{ color: 'text.secondary', mt: -0.5 }}>Frequency</InputLabel>
            <Select
              labelId="frequency-label"
              id="frequency"
              name="frequency"
              value={formik.values.frequency}
              onChange={(e) => {
                formik.handleChange(e);
                if (e.target.value === 'A') {
                  formik.setFieldValue('month', '');
                }
              }}
              label="Frequency"
            >
              <MenuItem value="A">Annual</MenuItem>
              <MenuItem value="M">Monthly</MenuItem>
            </Select>
            {formik.touched.frequency && formik.errors.frequency && (
              <FormHelperText>{formik.errors.frequency}</FormHelperText>
            )}
          </FormControl>
        </Grid>

        {/* Month - conditionally enabled */}
        <Grid xs={12} sm={6}>
          <Input
            fullWidth
            size="small"
            id="month"
            name="month"
            label="Month (1-12)"
            type="number"
            disabled={formik.values.frequency !== 'M'}
            value={formik.values.month}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.month && Boolean(formik.errors.month)}
            helperText={formik.touched.month && formik.errors.month}
          />
        </Grid>

        {/* Country Code */}
        <Grid xs={12} sm={6}>
          <Input
            fullWidth
            size="small"
            id="countryCode"
            name="countryCode"
            label="Country Code (e.g. USA)"
            placeholder="USA"
            value={formik.values.countryCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.countryCode && Boolean(formik.errors.countryCode)}
            helperText={formik.touched.countryCode && formik.errors.countryCode}
            inputProps={{ style: { textTransform: 'uppercase' } }}
          />
        </Grid>

        {/* Country Name */}
        <Grid xs={12} sm={6}>
          <Input
            fullWidth
            size="small"
            id="countryName"
            name="countryName"
            label="Country Name (e.g. United States)"
            placeholder="United States"
            value={formik.values.countryName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.countryName && Boolean(formik.errors.countryName)}
            helperText={formik.touched.countryName && formik.errors.countryName}
          />
        </Grid>

        {/* Indicator Code */}
        <Grid xs={12} sm={6}>
          <Input
            fullWidth
            size="small"
            id="indicatorCode"
            name="indicatorCode"
            label="Indicator Code (e.g. CPI)"
            placeholder="CPI"
            value={formik.values.indicatorCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.indicatorCode && Boolean(formik.errors.indicatorCode)}
            helperText={formik.touched.indicatorCode && formik.errors.indicatorCode}
            inputProps={{ style: { textTransform: 'uppercase' } }}
          />
        </Grid>

        {/* Indicator Name */}
        <Grid xs={12} sm={6}>
          <Input
            fullWidth
            size="small"
            id="indicatorName"
            name="indicatorName"
            label="Indicator Name (e.g. Consumer Prices)"
            placeholder="Consumer Prices"
            value={formik.values.indicatorName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.indicatorName && Boolean(formik.errors.indicatorName)}
            helperText={formik.touched.indicatorName && formik.errors.indicatorName}
          />
        </Grid>

        {/* Year */}
        <Grid xs={12} sm={6}>
          <Input
            fullWidth
            size="small"
            id="year"
            name="year"
            label="Year (e.g. 2026)"
            type="number"
            value={formik.values.year}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.year && Boolean(formik.errors.year)}
            helperText={formik.touched.year && formik.errors.year}
          />
        </Grid>

        {/* Value */}
        <Grid xs={12} sm={6}>
          <Input
            fullWidth
            size="small"
            id="value"
            name="value"
            label="Value"
            type="number"
            value={formik.values.value}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.value && Boolean(formik.errors.value)}
            helperText={formik.touched.value && formik.errors.value}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          loading={loading}
          sx={{ py: 1.2, px: 4 }}
        >
          {initialValues ? 'Save Changes' : 'Add Record'}
        </Button>
      </Box>
    </form>
  );
};

export default PriceForm;
