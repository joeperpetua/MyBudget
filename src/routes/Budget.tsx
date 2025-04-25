import { H1, H2, H3, H4 } from '@/components/ui/typography'
import { Button } from "@/components/ui/button"
import { Pencil, Plus, X } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'
import { useState } from 'react';

const people: Item[] = [
  { name: 'Joel', value: 3000 },
  { name: 'Alena', value: 900 },
]

const sharedExpenses: Item[] = [
  { name: 'Rent', value: 800 },
  { name: 'Groceries', value: 450 },
  { name: 'Internet', value: 45 },
  { name: 'Electricity', value: 50 },
  { name: 'Mobile Joel', value: 15 },
  { name: 'Mobile Alena', value: 10 },
]

const saving: Item[] = [
  { name: 'Tith', value: 10, currency: '%' },
  { name: 'Holidays', value: 10, currency: '%' },
  { name: 'House', value: 18, currency: '%' },
  { name: 'Gifts', value: 0.5, currency: '%' },
  { name: 'Kids', value: 3, currency: '%' },
]

interface Item {
  name: string;
  value: number;
  currency?: '$' | '€' | '£' | '%';
}

interface ListProps {
  title: string;
  itemsDefault: Item[];
}

const List: React.FC<ListProps> = ({ title, itemsDefault }) => {
  const [items, _setItems] = useState<Item[]>(itemsDefault);

  return (
    <div className='mt-8'>
      <H2>{title}</H2>
      <div className='flex flex-col gap-2 p-4'>
        {items.map((item) => (
          <ListItem key={item.name} name={item.name} value={item.value} currency={item.currency} />
        ))}
        <Button><Plus /> Add new</Button>
      </div>
    </div>
  )
}

interface ListItemProps {
  name: string;
  value: number;
  currency?: '$' | '€' | '£' | '%';
}

const ListItem: React.FC<ListItemProps> = ({ name, value, currency = '€' }) => {
  return (
    <div className='flex items-center justify-between p-4'>
      <H3>{name}</H3>
      <div className='flex items-center gap-2'>
        <H4 className='mr-2'>{`${value}${currency}`}</H4>
        <Button><Pencil /></Button>
        <Button variant={'destructive'}><X /></Button>
      </div>
    </div>
  )
}

const Budget = () => {

  return (
    <div className='flex flex-col p-4 min-h-screen'>
      <ModeToggle />
      <H1>Budget Name</H1>

      <List title='People' itemsDefault={people} />
      <List title='Shared Expenses' itemsDefault={sharedExpenses} />
      <List title='Savings' itemsDefault={saving} />
    </div>
  )
}

export default Budget;
