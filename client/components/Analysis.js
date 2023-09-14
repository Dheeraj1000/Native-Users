import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    StatusBar
  } from 'react-native';
  
  import { Ionicons } from '@expo/vector-icons';

  import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
  } from 'react-native-chart-kit';
  


  const MyStackedBarChart = () => {
    return (
      <>
        <Text style={styles.header}>Stacked Bar Chart</Text>
        <StackedBarChart
          data={{
            labels: ['Test1', 'Test2'],
            legend: ['L1', 'L2', 'L3'],
            data: [
              [60, 60, 60],
              [30, 30, 60],
            ],
            barColors: ['#dfe4ea', '#ced6e0', '#a4b0be'],
          }}
          width={Dimensions.get('window').width - 16}
          height={220}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </>
    );
  };
  
  const MyPieChart = () => {
    return (
      <>
        <Text style={styles.header}>Pie Chart</Text>
        <PieChart
          data={[
            {
              name: 'Seoul',
              population: 21500000,
              color: 'rgba(131, 167, 234, 1)',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: 'Toronto',
              population: 2800000,
              color: '#F00',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: 'New York',
              population: 8538000,
              color: '#ffffff',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: 'Moscow',
              population: 11920000,
              color: 'rgb(0, 0, 255)',
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
          ]}
          width={Dimensions.get('window').width - 16}
          height={220}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          absolute 
        />
      </>
    );
  };
  
  
  const Analysis = ({navigation}) => {
    return (
      <SafeAreaView >
         
        <ScrollView>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{
            flex: 1,
            backgroundColor: 'white',
            paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
            padding: 10
            
        }}>
            <Ionicons name="arrow-back-circle" size={45} color="black" />
            </TouchableOpacity>
          <View style={styles.container}>
         
            <View>
           
              <MyStackedBarChart />
            
              <MyPieChart />
        
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default Analysis;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: 5,
    },
    header: {
      textAlign: 'center',
      fontSize: 18,
      padding: 16,
      marginTop: 16,
    },
  });
  