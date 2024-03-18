import { Container, Dimmer, Grid, GridColumn, GridRow, Header, Loader, Segment, Transition } from 'semantic-ui-react';
import './Types.css';
import { useSelector } from 'react-redux';
import React from 'react';
import TypeView from './View/TypeView';
import TypeCreate from './Create/TypeCreate';

function Types() {
    
    const typesData = useSelector(state => state.admin.type);

    
    return (
        <>
        <div className='w-full m-0'>
                <Grid columns={2}>
                    <GridRow>
                        <GridColumn>
                            <Transition visible={!typesData.loading} animation='fade' duration={500}>
                                <TypeView typesData={typesData} />
                            </Transition>
                            <Transition className="z-10" visible={typesData.loading} animation='fade' duration={500}>
                                <Container>
                                    <Dimmer active>
                                    <Loader />
                                    </Dimmer>                            
                                </Container>
                            </Transition>
                        </GridColumn>
                        <GridColumn>
                            <TypeCreate typesData={typesData} />
                        </GridColumn>
                    </GridRow>
                </Grid>
        </div>       
        </>
      );
}

export default Types;
