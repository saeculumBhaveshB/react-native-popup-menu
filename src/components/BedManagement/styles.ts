import { StyleSheet } from 'react-native';

export const bedManagementStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Light gray background like in the image
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  bedGrid: {
    flex: 1,
    minWidth: '100%',
  },
  bedRow: {
    flexDirection: 'row',
    marginBottom: 12,
    justifyContent: 'flex-start',
    minWidth: '100%',
  },
  bedButton: {
    width: 80,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    position: 'relative',
  },
  bedButtonOccupied: {
    backgroundColor: '#90EE90', // Light green for available
    borderColor: '#7FBF7F', // Slightly darker green border
  },

  bedButtonAvailable: {
    backgroundColor: '#D3D3D3', // Light gray for occupied
    borderColor: '#B0B0B0', // Slightly darker gray border
  },
  bedButtonSelected: {
    backgroundColor: '#228B22', // Dark green for selected
    borderColor: '#1A6B1A', // Darker green border for selected
  },
  bedNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  bedNumberSelected: {
    color: '#fff', // White text for selected bed
  },
  verticalBar: {
    position: 'absolute',
    left: 4,
    top: 8,
    bottom: 8,
    width: 2,
    backgroundColor: '#fff',
    borderRadius: 1,
  },
  legend: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  legendTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  legendColor: {
    width: 16,
    height: 12,
    borderRadius: 2,
    marginRight: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  emptySpace: {
    width: 80,
    height: 60,
    marginRight: 12,
  },
  scrollableGrid: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});
