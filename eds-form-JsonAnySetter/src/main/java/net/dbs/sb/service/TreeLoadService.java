package net.dbs.sb.service;

import static ch.ralscha.extdirectspring.annotation.ExtDirectMethodType.TREE_LOAD;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import ch.ralscha.extdirectspring.annotation.ExtDirectMethod;
import net.dbs.sb.SimpleUserDb;
import net.dbs.sb.User;
import net.dbs.sb.util.PropertyOrderingFactory;

import com.google.common.base.Function;
import com.google.common.collect.Collections2;
import com.google.common.collect.ImmutableList;

@Service
public class TreeLoadService {

	@Autowired
	private SimpleUserDb db;

	@ExtDirectMethod(TREE_LOAD)
	public ImmutableList<Node> getTree(String node) {

		if ("root".equals(node) || !StringUtils.hasText(node)) {
			Node root = new Node();
			root.id = "Company";
			root.text = "Company";
			root.leaf = false;
			root.expanded = true;

			ImmutableList.Builder<Node> builder = ImmutableList.builder();
			for (String department : db.getDepartments()) {
				Node child = new Node();
				child.id = department;
				child.text = department;
				child.leaf = false;
				builder.add(child);
			}
			root.children = builder.build();

			return ImmutableList.<Node> builder().add(root).build();
		}

		List<User> users = PropertyOrderingFactory.createOrdering("lastName")
				.sortedCopy(db.findAllFromDepartment(node));
		return ImmutableList.copyOf(Collections2.transform(users, new Function<User, Node>() {
			@Override
			public Node apply(User input) {
				Node n = new Node();
				n.id = input.getId();
				n.text = input.getLastName() + " " + input.getFirstName();
				n.leaf = true;
				return n;
			}
		}));

	}

	public static class Node {
		public String id;

		public String text;

		public boolean leaf;

		public boolean expanded;

		public ImmutableList<Node> children;
	}

}
