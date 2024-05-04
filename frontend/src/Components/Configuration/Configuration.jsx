import React from 'react';
import CategorySelector from './CategorySelector/CategorySelector';
import './Configuration.css';
import ConfigurationStats from './ConfigurationStats/ConfigurationStats';
import Filters from './Filters/Filters';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories, fetchComparePropertiesByCategory, fetchPropertiesByCategory } from 'MyRedux/slices/Configuration';

function Configuration() {
  const currentCategory = useSelector(state => state.configuration.currentCategory)
  
  const dispatch = useDispatch();
  React.useEffect(()=>{
    dispatch(fetchCategories());
    dispatch(fetchPropertiesByCategory(currentCategory));
    dispatch(fetchComparePropertiesByCategory(currentCategory));
  })
  return (
    <div className=' flex-auto flex flex-row px-20 py-5 space-x-8  justify-center'>
      <Filters />
      <CategorySelector />
      <ConfigurationStats />
    </div>
  );
}

export default Configuration;
