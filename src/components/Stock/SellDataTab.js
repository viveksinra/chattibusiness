import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import AddView from './AddView';
import SellForm from './SellForm';
import SellList from './SellList';


export default function MyExperience({products}) {
  const [experiences, setExperiences] = useState([
    { company: 'Company A', startDate: '2021-01-01', endDate: '2022-01-01', title: 'Developer', description: 'Worked on developing web applications' },
  ]);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (experiences.length <= 0) {
      setIsAdding(true);
    }
  }, [experiences]);

  const handleAddExperience = (newExperience) => {
    setExperiences([...experiences, newExperience]);
    setIsAdding(false);
  };

  const handleEditExperience = (index, updatedExperience) => {
    const updatedExperiences = experiences.map((exp, i) => (i === index ? updatedExperience : exp));
    setExperiences(updatedExperiences);
  };

  const handleDeleteExperience = (index) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    setExperiences(updatedExperiences);
  };

  return (
    <ScrollView style={{ backgroundColor: '#fff', width:"100%" }}>
      <SafeAreaView style={{ flex: 1, marginTop: 1, backgroundColor: '#fff' }}>
        <AddView
          title={" Sell Data "}
          isAdding={isAdding}
          setIsAdding={setIsAdding}
          addText={'New Sell'}
          viewText={'View Sell'}
        />
        {isAdding ? (
          <SellForm products={products} />
        ) : (
          <SellList
          products={products}
        
          />
        )}
      </SafeAreaView>
    </ScrollView>
  );
}
