import { Container, Dimmer, Grid, GridColumn, GridRow, Loader, Transition } from 'semantic-ui-react';
import './Property.css';
import { useSelector } from 'react-redux';
import React from 'react';
import PropertyView from './View/PropertyView';
import PropertyCreate from './Create/PropertyCreate';

function Properties() {
    
    const propertiesData = useSelector(state => state.admin.property);

    
    return (
        <>
        <div className='w-full m-0'>
                <Grid columns={2}>
                    <GridRow>
                        <GridColumn>
                            <Transition visible={!propertiesData.loading} animation='fade' duration={500}>
                                <PropertyView propertiesData={propertiesData} />
                            </Transition>
                            <Transition className="z-10" visible={propertiesData.loading} animation='fade' duration={500}>
                                <Container>
                                    <Dimmer active>
                                    <Loader />
                                    </Dimmer>                            
                                </Container>
                            </Transition>
                        </GridColumn>
                        <GridColumn>
                            <PropertyCreate propertiesData={propertiesData} />
                        </GridColumn>
                    </GridRow>
                </Grid>
        </div>       
        </>
      );
}

export default Properties;
