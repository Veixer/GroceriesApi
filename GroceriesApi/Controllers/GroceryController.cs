using System.Collections.Generic;
using System.Linq;
using GroceriesApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace GroceriesApi.Controllers
{
	[Route("api/groceries")]
    public class GroceryController : Controller
    {
		private readonly GroceryContext _context;

		public GroceryController(GroceryContext context)
		{
			_context = context;
		}

		[HttpGet]
		public List<GroceryItem> GetAll()
		{
			return _context.GroceryItems.ToList();
		}

		[HttpGet("{id}", Name = "GetGrocery")]
		public IActionResult GetById(int id)
		{
			var item = _context.GroceryItems.Find(id);
			if (item == null)
			{
				return NotFound();
			}
			return Ok(item);
		}

		[HttpPost]
		public IActionResult Create([FromBody] GroceryItem item)
		{
			if (item == null)
			{
				return BadRequest();
			}

			_context.GroceryItems.Add(item);
			_context.SaveChanges();

			return CreatedAtRoute("GetGrocery", new { id = item.Id }, item);
		}

		[HttpPut("{id}")]
		public IActionResult Update(int id, [FromBody] GroceryItem item)
		{
			if (item == null || item.Id != id)
			{
				return BadRequest();
			}

			var grocery = _context.GroceryItems.Find(id);
			if (grocery == null)
			{
				return BadRequest();
			}

			grocery.Name = item.Name;
			grocery.Size = item.Size;
			grocery.Amount = item.Amount;

			_context.GroceryItems.Update(grocery);
			_context.SaveChanges();
			return NoContent();
		}

		[HttpDelete("{id}")]
		public IActionResult Delete(int id)
		{
			var grocery = _context.GroceryItems.Find(id);
			if (grocery == null)
			{
				return NotFound();
			}

			_context.GroceryItems.Remove(grocery);
			_context.SaveChanges();
			return NoContent() ;
		}
    }
}
